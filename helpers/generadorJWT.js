const jwt = require('jsonwebtoken');

const generarJWT = async (uid, expiresIn = '4h') => {
    try {
        // Validar que la clave secreta esté configurada
        if (!process.env.SECRETKEY) {
            throw new Error('La clave secreta (SECRETKEY) no está definida en las variables de entorno.');
        }

        // Crear el token
        const payload = { uid };
        const token = await jwt.sign(payload, process.env.SECRETKEY, { expiresIn });
        return token;
    } catch (err) {
        console.error('Error al generar el JWT:', err);
        throw new Error('No se pudo generar el token.');
    }
};

module.exports = generarJWT;


