const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        ['/homo-app', '/homo-admin'],
        createProxyMiddleware({
            target: 'http://127.0.0.1:8089',
            changeOrigin: true,
            pathRewrite: {
                '^/homo-admin': '/admin', // rewrite path
                '^/homo-app': '/app', // rewrite path
            },
        }),
    );
};
