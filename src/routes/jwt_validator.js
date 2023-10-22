const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const User = require('../models/userModel');
const { JWT_SECRET } = require('../configs/constants')

//Configuracion de Passport
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;

passport.use(new Strategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.id);
        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
}));

//Usando Passport se valida que el jwt sea valido
const authenticateJWT = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Acceso no autorizado' });
        }
        // Si el usuario está autenticado, puedes almacenar su información en req.user para su uso posterior
        req.user = user;
        next();
    })(req, res, next);
};

module.exports = authenticateJWT