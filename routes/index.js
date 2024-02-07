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

const http = require('http');
const express = require('express');
const router = express.Router();
const app = express;
const port = 8887;

function onRequest(req, res) {
  res.writeHead(200, {'Content-Type' : 'text/plain'});
  res.write('hello nodejs')
  res.end()

}

http.createServer(onRequest).listen(8888);

console.log('안되나?')



router.get('/test', (req, res) => {
  res.send('Hello Express!!!!!!!')
});

// router.listen(port, () => {
//   console.log('Example app listening on port 3000!')
// });

module.exports = router;

