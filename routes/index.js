// var express = require('express');
// var router = express.Router();
//
// console.log('노드서버 실행완료');
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: '야!!!' });
//
// });
//
// router.get('/hello', function(req, res, next) {
//   res.render('index', { title: '헬로!' });
//
// });
//
// module.exports = router;

const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const app = express();

// MySQL 연결 설정
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '1004',
  port: 3307,
  database: 'nodejs'
};

// MySQL 연결 생성
const connection = mysql.createConnection(dbConfig);

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류: ' + err.stack);
    return;
  }
  console.log('MySQL 서버에 연결됨');
});

// 루트 경로에서 모든 사용자 데이터 가져오기
router.get('/', (req, res) => {
  connection.query('SELECT * FROM users', (error, results, fields) => {
    if (error) {
      console.error('쿼리 오류: ' + error.stack);
      res.status(500).send('데이터베이스 쿼리 오류');
      return;
    }
    res.json(results);
  });
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중`);
});


module.exports = router;