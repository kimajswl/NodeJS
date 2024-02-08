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
const mysql = require('mysql2');

const app = express();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1004',
  database : 'nodejs',
  port : 3307
});

connection.connect();

// 루트 경로에서 모든 사용자 데이터 가져오기
router.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  connection.query('SELECT * FROM users', (error, results, fields) => {
    if (error) {
      console.error('쿼리 오류: ' + error.stack);
      res.status(500).send('데이터베이스 쿼리 오류');
      return;
    }
    res.json(results);
  });
});

// 라우터를 express 앱에 등록
app.use('/', router);

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중`);
});

// 모듈 내보내기는 한 번만 해야 합니다.
module.exports = router;
