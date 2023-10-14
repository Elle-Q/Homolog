const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        ['/leetroll-app', '/leetroll-admin'],
        createProxyMiddleware({
            target: 'http://127.0.0.1:8089',
            changeOrigin: true,
            pathRewrite: {
                '^/leetroll-admin': '/admin', // rewrite path
                '^/leetroll-app': '/app', // rewrite path
            },
        }),
    );
};
