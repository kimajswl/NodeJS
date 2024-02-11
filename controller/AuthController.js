// TODO. 엑세스 토큰 부분 추가, 비밀번호 암호화하는거 알아보고 적용하기

const jwt = require("jsonwebtoken");
let {refreshToken} = require("mysql/lib/protocol/Auth");
const SECRET_KEY = "c5eef9effaf8feb06fe4223b042f0d58e8d62b065ab5c1762452f1e81c1a682d076783570c56c8fd30721dc8a15f625321a8f27f903733d35d010b870af256c1";
const refreshTokenTime = 24 * 60 * 60 * 1000;
const accessTokenTime = 30 * 60 * 1000;

const login = async(req, res) => { // 사용자 정보 받아서 토큰 만들고 토큰에 넣기
    const username = req.body.username;

    refreshToken = jwt.sign({
        type: 'JWT',
        username: username,
    },SECRET_KEY, {
        expiresIn: refreshTokenTime,
        issuer: '나'
        });

    return res.status(200).json({
        code: 200,
        message: '토큰이 발급되었습니다.',
        token: refreshToken
    });
}

module.exports = {
    login
}