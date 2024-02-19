const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;
const SECRET_KEY = "c5eef9effaf8feb06fe4223b042f0d58e8d62b065ab5c1762452f1e81c1a682d076783570c56c8fd30721dc8a15f625321a8f27f903733d35d010b870af256c1";
// const refreshTokenTime = 24 * 60 * 60 * 1000; // 하루
const refreshTokenTime = 30 * 1000;
const accessTokenTime = 30 * 1000;
// const accessTokenTime = 30 * 60 * 1000; // 30분

const login = async(req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ where: { username: username } }).catch((err) =>
            console.log(err)
        );
        if (user && user.password === password) {
            const refreshToken = jwt.sign({
                type: 'RefreshToken',
                username: username,
            }, SECRET_KEY, {
                expiresIn: refreshTokenTime,
                issuer: username
            });

            const accessToken = jwt.sign({
                type: 'AccessToken',
                username: username,
            }, SECRET_KEY, {
                expiresIn: accessTokenTime,
                issuer: username
            });

            res.json({ accessToken, refreshToken });
        } else {
            res.status(401).json({ error: '아이디 또는 비밀번호가 틀립니다.' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: '로그인 중 문제가 생겼습니다.' });
    }
}


const protectedService = async(req, res) => {
    res.send("authorized")
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    const decodedToken = jwt.decode(token);
    if (!decodedToken || !decodedToken.type) {
        return res.sendStatus(401);
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    code: 401,
                    message: '토큰이 만료되었습니다.',
                });
            } else {
                console.error(err);
                return res.status(403).json({
                    code: 403,
                    message: '유효하지 않은 토큰입니다.',
                });
            }
        }
        req.user = user;
        next();
    });
}

function generateAccessToken(refreshToken) {
    try {
        const decoded = jwt.verify(refreshToken, SECRET_KEY);
        const username = decoded.username;

        const accessToken = jwt.sign({
            type: 'AccessToken',
            username: username,
        },SECRET_KEY, {
            expiresIn: "30s",
            issuer: username
        });

        return accessToken;
    } catch (error) {
        throw new Error('Refresh Token is invalid or expired');
    }
}

const refreshExpiredToken = (req, res) => { // 임시로 만료 시간이 안되어도 그냥 재발급 받을 수 있도록 함
    const refreshToken = req.body.refreshToken;

    try {
        const accessToken = generateAccessToken(refreshToken);

        res.status(200).json({ accessToken });
    } catch (error) {
        if (error.message === 'Refresh Token is invalid or expired') {
            res.status(401).json({ error: 'Refresh Token is invalid or expired' });

        } else {
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