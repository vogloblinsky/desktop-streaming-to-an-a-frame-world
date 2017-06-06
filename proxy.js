var httpProxy = require('http-proxy');

var proxyVideo1 = httpProxy.createProxyServer({
    target: 'http://127.0.0.1:1234'
});

proxyVideo1.on('proxyRes', function(proxyRes, req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
});

proxyVideo1.listen(8000);

var proxyVideo2 = httpProxy.createProxyServer({
    target: 'http://127.0.0.1:1235'
});

proxyVideo2.on('proxyRes', function(proxyRes, req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
});

proxyVideo2.listen(8001);
