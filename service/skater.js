const bcryptjs = require('bcryptjs');
const Skater = require('../models/skater');

const createSkater = async (email, nombre, password, temporadasexperiencia, especialidad, foto, estado) => {
    try {
        
        const salt = bcryptjs.genSaltSync();
        password = bcryptjs.hashSync(password, salt);
        
        const skater = await Skater.create({
            email, nombre, password, temporadasexperiencia, especialidad, foto, estado
        });
        return{
            msg: `El Skater ${nombre} ha clasificado `,
            status: 201,
            datos: []
        }
    } catch (error) {
        console.log(error);
        return{
            msg: 'Error al crear el skater',
            status: 500,
            datos: []
            };
        }
    }
    

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


const updateSkater = async (id, email, nombre, password, temporadasexperiencia, especialidad, foto, estado) => {
try {
    
    await Skater.update({ id, email, nombre, password, temporadasexperiencia, especialidad, foto, estado }, {where:{ id }});
} catch (error) {
    console.log(error);
    
    return error.message
    }
}

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
                createSkater,
                findAllSkaters,
                findById,
                updateSkater,
                deleteById
                };