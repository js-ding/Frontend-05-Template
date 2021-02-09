const http = require('http');
// const fs = require('fs');
const unzipper = require('unzipper');

http.createServer((request, response) => {
    // 这里服务系统和发布系统存放在一台机器上，这里直接使用相对路径
    // const outFile = fs.createWriteStream('../server/public/index.html');

    request.pipe(unzipper.Extract({ path: '../server/public' }));

    /*request.on('data', chunk => {
        outFile.write(chunk);
    });
    request.on('end', () => {
        outFile.end();
        response.end('Success');
    });*/
}).listen(3303);
