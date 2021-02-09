const http = require('http');
const fs = require('fs');
const archiver = require('archiver');

/*  ============================= 1. 读取流 ===============================
const file = fs.createReadStream('./package.json');

file.on('data', chunk => {
    console.log('data', chunk.toString());
});

file.on('end', chunk => {
    console.log('end', chunk);
})
*/

// ============================= 2. 单个文件上传 ==============================
// const request = http.request({
//     // hostname: '47.100.95.127',
//     hostname: '127.0.0.1',
//     port: 3303,
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/octet-stream'
//     }
// }, response => {
//     console.log(response);
// });

// const file = fs.createReadStream('./sample.html');

// file.pipe(request);

// /* file.on('data', chunk => {
//     console.log('data', chunk.toString());
//     request.write(chunk);
// });

// file.on('end', chunk => {
//     console.log('finish');
//     request.end(chunk);
// }); */

// file.on('end', () => {
//     request.end();
// });

// =================== 3. 多文件打包上传 =======================
fs.stat('./sample.html', (err, stats) => {
    const request = http.request({
        // hostname: '47.100.95.127',
        hostname: '127.0.0.1',
        port: 3303,
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream'
        }
    }, response => {
        console.log(response);
    });

    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });

    archive.directory('./sample/', false);

    // pipe archive data to the file
    archive.pipe(request);

    // finalize the archive (ie we are done appending files but streams have to finish yet)
    // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
    archive.finalize();
});
