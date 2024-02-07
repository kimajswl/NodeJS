var http = require('http');

http.createServer(function handler(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end('Hello Node JS')

}).listen(3000)

console.log('노드서버 실행완료');