'use strict';
// httpモジュールを読み込み
const http = require('http');
// /fsモジュールを読み込み
// /urlモジュールを読み込み

// createServer()関数で鯖を作成
const server = http.createServer((req, res) => {
    const now = new Date();
    console.info('[' + now + '] Requested by ' + req.socket.remoteAddress);
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

    switch (req.method) {
      case 'GET':
        const fs = require('fs');
        const rs = fs.createReadStream('./form.html');
        rs.pipe(res);
        break;
      case 'POST':
        let rawData = '';
        req
          .on('data', chunk => {
            rawData = rawData + chunk;
          })
          .on('end', () => {
            const decoded = decodeURIComponent(rawData);
            console.info('[' + now + '] 投稿: ' + decoded);
            res.write(
              '<!DOCTYPE html><html lang="ja"><body><h1>' +
                decoded +
                'が投稿されました</h1></body></html>'
            );
            res.end();
          });
        break;
      default:
        break;
    }
  })
  // エラーログを出力
  .on('error', e => {
    console.error('[' + new Date() + '] Server Error', e);
  })
  .on('clientError', e => {
    console.error('[' + new Date() + '] Client Error', e);
  });

// ポートを設定
const port = 8000;
// 鯖を起動。実行する関数は無名からのデータ取得
server.listen(port, () => {
  console.info('[' + new Date() + '] Listening on ' + port);
});