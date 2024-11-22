const jwt = require('jsonwebtoken');

const validacionToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                msg: 'No hay token, vuelve a intentar',
            });
        }

        const token = authHeader.split(' ')[1];


        const payload = jwt.verify(token, process.env.SECRETKEY);

        req.email = payload.email;

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            msg: 'No estás autorizado',
            datos: [],
        });
    }
};

module.exports = validacionToken;
