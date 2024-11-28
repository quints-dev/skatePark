const bcryptjs = require('bcryptjs');
const Skater = require('../models/skater')
const { generarJWT } = require('../helpers/generadorJWT');

const login = async (nombre, password) =>{
try {
    const skater = await Skater.findOne({ where: { nombre }});
    if (!skater) {
        throw new Error('Skater no encontrado');
    }

    if(!skater.estado){
        throw new Error('Skater no activo');
    }

    const validacionPassword = bcryptjs.compareSync(password, skater.password);
    if(!validacionPassword){
        throw new Error('Clave no válida');
    }

    const token = await generarJWT(skater.id);
    return{
        msg: 'Login exitoso',
        datos: {
            skater: {
                id: skater.id,
                nombre: skater.nombre,
                email: skater.email,
                estado: skater.estado,
            },
            token,
        },
    };
} catch (error) {
    console.log(error);
    return{
        msg: 'Error en el login',
        datos: []
    }
}
}
module.exports = login;