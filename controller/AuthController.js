
const jwt = require("jsonwebtoken");
const db = require("../models");
const SECRET_KEY = "c5eef9effaf8feb06fe4223b042f0d58e8d62b065ab5c1762452f1e81c1a682d076783570c56c8fd30721dc8a15f625321a8f27f903733d35d010b870af256c1";
const refreshTokenTime = 24 * 60 * 60 * 1000; // 하루
const accessTokenTime = 30 * 60 * 1000; // 30분

const RefreshToken = db.refreshToken;

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
        if (err.name == 'TokenExpiredFrror') {

        }
    } // 만약에 accessToken이 만료가 되었다면 refreshToken으로 재발급하고, 만약에 refreshToken이 만료가 되었다면 둘다 재발급 받기

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

function generateAccessToken(refreshToken) {
    try {
        // Refresh Token 검증
        const decoded = jwt.verify(refreshToken, SECRET_KEY);

        // 사용자 이름 추출
        const userId = decoded.username;


        // 새로운 Access Token 생성
        const accessToken = jwt.sign({ userId }, secretKey, { expiresIn: accessTokenExpireTime });

        // 생성된 Access Token 반환
        return accessToken;
    } catch (error) {
        // Refresh Token이 유효하지 않은 경우
        throw new Error('Refresh Token is invalid or expired');
    }
}

// Refresh Token을 이용하여 새로운 Access Token을 생성하고 반환하는 라우터 핸들러
const refreshExpiredToken = (req, res) => {
    const { refreshToken } = req.body;

    try {
        // 새로운 Access Token 생성
        const accessToken = generateAccessToken(refreshToken);

        // 생성된 Access Token을 클라이언트에게 반환
        res.status(200).json({ accessToken });
    } catch (error) {
        // Refresh Token이 만료된 경우
        if (error.message === 'Refresh Token is invalid or expired') {
            res.status(401).json({ error: 'error' }); // 여기서 자꾸 걸림 refreshToken 만료 시간을 좀 업청 짧게 주고 지나면 넣어서 다시 해보기

        } else {
            // 기타 오류 처리
            res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = {
    login,
    authenticateToken,
    protectedService,
    refreshExpiredToken
}