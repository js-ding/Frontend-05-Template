const http = require('http');
const https = require('https');
// const fs = require('fs');
const unzipper = require('unzipper');
const querystring = require('querystring');
const { info } = require('console');

// 2. auth路由：接收code，换取token回传给客户端
function auth(request, response) {
    const query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]);
    getToken(query.code, (body) => {
        // 返回一个发布页面
        response.write(`<a href=http://localhost:3303/publish?token=${body.access_token}>publish</a>`);
        response.end();
    });
}

function getToken(code, callback) {
    const request = https.request({
        hostname: 'github.com',
        port: 443,
        path: `/login/oauth/access_token?code=${code}&client_id=Iv1.1c055c1d55454bd2&client_secret=c1b7fd42f936dbca44c32290de8ac6f9bfc70597`,
        method: 'POST',
    }, function(response) {
        let body = '';
        response.on('data', chunk => {
            body += chunk;
        });
        response.on('end', () => {
            callback(querystring.parse(body));
        })
    });
    request.end();
}

// 4. publish路由：用token获取用户信息，检查权限，接受发布
function publish(request, response) {
    const query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1]);
    if (query.token) {
        getUser(query.token, function(info) {
            // Request forbidden by administrative rules. Please make sure your request has a User-Agent header (http://developer.github.com/v3/#user-agent-required). Check https://developer.github.com for other possible causes.:''
            // console.log(body);
            // {"login":"markgong-gd","id":48786701,"node_id":"MDQ6VXNlcjQ4Nzg2NzAx","avatar_url":"https://avatars.githubusercontent.com/u/48786701?v:'4","gravatar_id":"","url":"https://api.github.com/users/markgong-gd","html_url":"https://github.com/markgong-gd","followers_url":"https://api.github.com/users/markgong-gd/followers","following_url":"https://api.github.com/users/markgong-gd/following{/other_user}","gists_url":"https://api.github.com/users/markgong-gd/gists{/gist_id}","starred_url":"https://api.github.com/users/markgong-gd/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/markgong-gd/subscriptions","organi…rl":"https://api.github.com/users/markgong-gd/repos","events_url":"https://api.github.com/users/markgong-gd/events{/privacy}","received_events_url":"https://api.github.com/users/markgong-gd/received_events","type":"User","site_admin":false,"name":"dinggong","company":null,"blog":"","location":null,"email":null,"hireable":null,"bio":null,"twitter_username":null,"public_repos":33,"public_gists":0,"followers":3,"following":7,"created_at":"2019-03-21T07:52:32Z","updated_at":"2021-02-14T14:14:56Z"}'
            if (info.login === 'markgong-gd') {
                request.pipe(unzipper.Extract({ path: '../server/public' }));
                request.on('end', () => {
                    response.end('success!');
                })
            }
        });
    }

}

function getUser(token, callback) {
    const request = https.request({
        hostname: 'api.github.com',
        port: 443,
        path: '/user',
        method: 'GET',
        headers: {
            'Authorization': `token ${token}`,
            'User-Agent': 'markgong-gd'
        }
    }, function(response) {
        let body = '';
        response.on('data', chunk => {
            body += chunk;
        });
        response.on('end', () => {
            callback(JSON.parse(body));
        })
    });
    request.end();
}

http.createServer((request, response) => {
    if (request.url.match(/^\/auth/) && request.url.match(/^\/auth/)[0] === '/auth') {
        return auth(request, response);
    }
    if (request.url.match(/^\/publish/) && request.url.match(/^\/publish/)[0] === '/publish') {
        return publish(request, response);
    }
    // 这里服务系统和发布系统存放在一台机器上，这里直接使用相对路径
    // const outFile = fs.createWriteStream('../server/public/index.html');

    // request.pipe(unzipper.Extract({ path: '../server/public' }));

    /*request.on('data', chunk => {
        outFile.write(chunk);
    });
    request.on('end', () => {
        outFile.end();
        response.end('Success');
    });*/
}).listen(3303);

