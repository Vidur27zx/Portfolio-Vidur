const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const preferredPort = Number(process.env.PORT || 4173);
const host = '127.0.0.1';

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function safePath(urlPath) {
  const decoded = decodeURIComponent((urlPath || '/').split('?')[0]);
  const cleaned = decoded === '/' ? '/index.html' : decoded;
  const full = path.normalize(path.join(root, cleaned));
  if (!full.startsWith(root)) {
    return null;
  }
  return full;
}

const server = http.createServer((req, res) => {
  const full = safePath(req.url || '/');
  if (!full) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(full, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(root, 'index.html'), (indexErr, indexData) => {
          if (indexErr) {
            res.writeHead(404);
            res.end('Not found');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(indexData);
        });
        return;
      }
      res.writeHead(500);
      res.end('Server error');
      return;
    }

    const ext = path.extname(full).toLowerCase();
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

function startOnPort(ports, index = 0) {
  if (index >= ports.length) {
    console.error('Could not start local server on any fallback port.');
    process.exit(1);
    return;
  }

  const port = ports[index];

  const onError = (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} is busy, trying next...`);
      server.off('error', onError);
      startOnPort(ports, index + 1);
      return;
    }
    console.error(`Server failed on ${port}: ${err.message}`);
    process.exit(1);
  };

  server.once('error', onError);

  server.listen(port, host, () => {
    server.off('error', onError);
    console.log(`Portfolio server running at http://${host}:${port}`);
    console.log(`Open in browser: http://localhost:${port}`);
  });
}

startOnPort([preferredPort, 4174, 5500, 8080]);
