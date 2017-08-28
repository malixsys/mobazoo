const express = require('express');
const next = require('next');
const moment = require('moment');
const bodyParser = require('body-parser');
const { join } = require('path');
const { parse } = require('url');
const routes = require('./routes/index');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

app.prepare()
    .then(() => {
        const server = express();
        server.use(bodyParser.json());

        server.get('/sw.js', (req, res) => {
            const parsedUrl = parse(req.url, true);
            const { pathname } = parsedUrl;
            const filePath = join(__dirname, 'build', pathname);
            app.serveStatic(req, res, filePath);
        });

        server.post('/auth/signin', routes.auth.signIn);

        server.post('/api/me/profile/list', routes.profile.list);

        server.get('*', (req, res) => handle(req, res));

        server.listen(PORT, (err) => {
            if (err) {
                throw err;
            }
            const apibaseurl = process.env.API_BASE_URL || process.env.NOW_URL;
            console.log(`Using base url: '${apibaseurl}'`);
            console.log(`> Ready on port ${PORT}`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
