const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        ['app', '/homo-admin'],
        createProxyMiddleware({
            target: 'http://192.168.2.30:8089',
            changeOrigin: true,
            pathRewrite: {
                '^/homo-admin': '/admin', // rewrite path
            },
        }),
    );
};
