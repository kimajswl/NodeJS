
const jwt = require("jsonwebtoken");
const db = require("../models");
const SECRET_KEY = "c5eef9effaf8feb06fe4223b042f0d58e8d62b065ab5c1762452f1e81c1a682d076783570c56c8fd30721dc8a15f625321a8f27f903733d35d010b870af256c1";
const refreshTokenTime = 24 * 60 * 60 * 1000; // 하루
const accessTokenTime = 30 * 60 * 1000; // 30분

const RefreshToken = db.refreshToken;


// TODO. 토큰 재발급
const login = async(req, res) => { // 로그인과 동시에 accessToken, refreshToken 발급
    const username = req.body.username;

    const refreshToken = jwt.sign({
        type: 'RefreshToken',
        username: username,
    },SECRET_KEY, {
        expiresIn: refreshTokenTime,
        issuer: '나ㅋ'
        });

    const accessToken = jwt.sign({
        type: 'AccessToken',
        username: username,
    },SECRET_KEY, {
        expiresIn: "30s",
        issuer: '나ㅋ'
    });

    res.json({ accessToken, refreshToken })
}

const protectedService = async(req, res) => { // 성공 시 실행
    res.send("authorized")
}

function authenticateToken(req, res, next) { // 토큰 인증
    const authHeader = req.headers['authorization']; // 소문자로 해야 헤더 값을 불러올 수 있음
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    const tokenType = jwt.decode(token).type;
    if (tokenType == 'AccessToken') {
        return res.sendStatus(200).message("액세스 토큰 잘 들어옴~")
    }

    jwt.verify(token, SECRET_KEY, (err, user) => { // 인증
        if (err.name == 'TokenExpiredFrror') {
            return res.sendStatus(401).json({
                code: 401,
                message: '토큰이 만료되었습니다.',
            });
        }
        else if(err) {
            return res.sendStatus(403).json({
               code: 403,
               message : '유효하지 않은 토큰입니다.',
            });
        }
        req.user = user;
        next();
    });
}

module.exports = {
    login,
    authenticateToken,
    protectedService
}