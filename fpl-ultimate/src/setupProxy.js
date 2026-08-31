const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000', // matches the API's default (no-profile) server.port
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
        })
    );
};
