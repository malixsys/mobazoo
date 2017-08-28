const express = require('express');
const next = require('next');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { join } = require('path');
const { parse } = require('url');
const routes = require('./routes/index');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-node-fs-backend');
const i18n = require('./i18n');

i18n
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        preload: ['en', 'de'], // preload all langages
        ns: ['common', 'home', 'page2'], // need to preload all the namespaces
        backend: {
            loadPath: join(__dirname, '/locales/{{lng}}/{{ns}}.json'),
            addPath: join(__dirname, '/locales/{{lng}}/{{ns}}.missing.json')
        }
    }, () => {
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

                server.use(morgan('dev', {
                    skip: (req, res) => req.url.indexOf('on-demand-entries-ping') > -1
                }));

                server.post('/auth/signin', routes.auth.signIn);

                server.post('/api/me/profile/list', routes.profile.list);

                server.get('*', (req, res) => handle(req, res));

                server.listen(PORT, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log(`> Ready on port ${PORT}`);
                });
            })
            .catch((ex) => {
                console.error(ex.stack);
                process.exit(1);
            });
    });
