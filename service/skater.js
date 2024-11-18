const Skater = require('../models/skater');


const createSkater = async (email, nombre, password, temporadasexperiencia, especialidad, foto, estado) => {
try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const skater = await Skater.create({
        email, 
        nombre, 
        password: hashedPassword,
        temporadasexperiencia,
        especialidad,
        foto,
        estado
    });
    return{
        msg: 'Skater creado exitosamente',
        status: 201,
        datos: skater.toJSON()
    }
} catch (error) {
    return{
        msg: 'Error al crear el skater',
        status: 500,
        datos: []
    }
}
}

module.exports = createSkater;