const bcrypt = require('bcrypt');
const Skater = require('../models/skater');


const findAllSkaters = async () => {
try {
    const skaters = await Skater.findAll();
    return {
        msg: 'Skaters encontrados',
        status: 200,
        datos: skaters,
    };
} catch (error) {
    console.log('Error al obtener datos', error.message);
    return {
        msg: 'Error del servidor',
        status: 500,
        datos: [],
    };
    }
};

const findById = async (id) => {
    try {
        
        const skater = await Skater.findOne({
            where:{
                id: id
            }
        });
        if(!skater){
            return{
                msg:`El skater con id ${id} no existe`,
                status: 204,
                datos:[]
            }
        }
        return{
            msg: `Skater encontrado con id ${id}`,
            status: 200,
            datos: skater.toJSON()
        }
    } catch (error) {
    console.log(error);
    return{
        msg: 'Error en servidor',
        status: 500,
        datos: []
        }
    }
}

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
        msg: `Error al crear el skater, ${error.message}`,
        status: 500,
        datos: []
    };
}
};

const updateSkater = async (id, email, nombre, password, temporadasexperiencia, especialidad, foto, estado) => {
try {
    const updateData = { email,nombre,password,temporadasexperiencia,especialidad,foto,estado };
    if(password){
        updateData = await bcrypt.hash(password, 10);// hash password solo en contraseña nueva
    }

    const [actualizar] = await Skater.update(updateData, {
        where: { 
            id
        }
    });
    if(actualizar === 0 ){
        return{
            msg: 'Skater no encontrado',
            status: 400,
            datos: []
        };
    }
    const actualizarSkater = await Skater.findByPk(id);
    return{
        msg: 'Skate actualizado con exito',
        status: 200,
        datos: actualizarSkater.toJSON()    
    };
} catch (error) {
    console.log('Error al actualizar skater:', error.message);
    return{
        msg: 'Error en el servidor',
        status: 500,
        datos: []
        };
    }
};

const deleteById = async (id) => {
    try {
        // Verificar si el skater existe
        const skater = await Skater.findOne({
            where: { id }
        });

        // Si no existe el skater
        if (!skater) {
            return {
                msg: `Skater con id ${id} no existe`,
                status: 400,
                datos: []
            };
        }

        // Eliminar el skater
        const result = await Skater.destroy({
            where: { id }
        });

        // Si no se eliminó ningún skater, retornar un error
        if (result === 0) {
            return {
                msg: `No se pudo eliminar el skater con id ${id}`,
                status: 400,
                datos: []
            };
        }

        // Respuesta de éxito
        return {
            msg: `Skater con id ${id} eliminado con éxito`,
            status: 200,
            datos: []
        };

    } catch (error) {
        console.log('Error al eliminar el skater:', error.message);
        return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        };
    }
};



module.exports = {
                findAllSkaters,
                findById,
                createSkater,
                updateSkater,
                deleteById 
            };
                