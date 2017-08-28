const moment = require('moment');

const ADMIN_EMAIL = 'test@test.com';

const createToken = (user) => {
    const _jwt = require('jsonwebtoken');
    const payload = {
        scope: 'appUser',
        userId: user.email,
        sub: user.unique_id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
        type: user.type,
        status: user.status
    };
    const secretKey = process.env.SECRET_KEY || 'thisisthemostsecretthingever';
    const secretId = process.env.SECRET_ID || 'no_thisisthemostsecretthingever';
    return _jwt.sign(payload, secretKey);
};

module.exports = {
    signIn: (req, res) => {
        if (!req.body) {
            return setTimeout(() => res.status(401).send({
                success: false,
                message: 'Wrong email and/or password'
            }), 2000);
        }
        const email = req.body.email && req.body.email.toLowerCase();
        if (email !== ADMIN_EMAIL) {
            return setTimeout(() => res.status(401).send({
                success: false,
                message: 'Wrong email and/or password'
            }), 2000);
        }
        const user = {
            unique_id: 1,
            name: 'ADMIN',
            email: ADMIN_EMAIL,
            type: 'admin',
            status: 'active'
        };
        res.status(200).json({
            user,
            token: createToken(user)
        });
    }
};
