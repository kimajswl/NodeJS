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



app.get('/test', (req, res) => {
    res.send('Hello Express!!!!!!!')
});

app.listen(port, () => {
    console.log('Example app listening on port 3000!')
});

module.exports = router;