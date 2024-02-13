
const jwt = require("jsonwebtoken");
let {refreshToken} = require("mysql/lib/protocol/Auth");
const db = require("../models");
const SECRET_KEY = "c5eef9effaf8feb06fe4223b042f0d58e8d62b065ab5c1762452f1e81c1a682d076783570c56c8fd30721dc8a15f625321a8f27f903733d35d010b870af256c1";
const refreshTokenTime = 24 * 60 * 60 * 1000;
const accessTokenTime = 30 * 60 * 1000;

const RefreshToken = db.refreshToken;

const login = async(req, res) => {
    const username = req.body.username;

    const refreshToken = jwt.sign({
        type: 'JWT',
        username: username,
    },SECRET_KEY, {
        expiresIn: refreshTokenTime,
        issuer: '나ㅋ'
        });

    const accessToken = jwt.sign({
        type: 'JWT',
        username: username,
    },SECRET_KEY, {
        expiresIn: accessTokenTime,
        issuer: '나ㅋ'
    });

    res.json({accessToken, refreshToken })
}

const protectedService = async(req, res) => {
    res.send("authorized")
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; // 소문자로 해야 헤더 값을 불러올 수 있음
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = {
    login,
    authenticateToken,
    protectedService
}