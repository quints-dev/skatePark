const { findAllSkaters, findById, createSkater, updateSkater, deleteById } = require('../service/skater');

const findAllSkatersController = async (req, res) => {
    try {
        const response = await findAllSkaters();
        res.status(response.status).json({
            msg: 'Lista de Skaters obtenida',
            datos: response.datos,
        });
    } catch (error) {
        console.error('Error al obtener los skaters:', error.message);
        res.status(500).json({
            msg: 'Error del servidor',
            datos: [],
        });
    }
};

const findByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const respuesta = await findById(id);

        if (!respuesta) {
            return res.status(404).json({
                msg: 'Skater no encontrado',
                datos: [],
            });
        }

        res.status(respuesta.status).json({
            msg: respuesta.msg,
            datos: respuesta.datos,
        });
    } catch (error) {
        console.error('Error en findByIdController:', error.message);
        res.status(500).json({
            msg: 'Error del servidor',
            datos: [],
        });
    }
};


const createSkaterController = async (req, res) => {
    try {
        const { email, nombre, password, temporadaexperiencia, especialidad, foto, estado } = req.body;

        // Validación de campos obligatorios
        if (!email || !nombre || !password) {
            return res.status(400).json({
                msg: 'Faltan campos obligatorios',
                datos: [],
            });
        }

        const response = await createSkater(email, nombre, password, temporadaexperiencia, especialidad, foto, estado);
        res.status(response.status).json({
            msg: response.msg,
            datos: response.datos,
        });
    } catch (error) {
        console.error('Error en createSkaterController:', error.message);
        res.status(500).json({
            msg: 'Error del servidor',
            datos: [],
        });
    }
};


const updateSkaterController = async (req, res) => {
    try {
        const { id, email, nombre, password, temporadaexperiencia, especialidad, foto, estado } = req.body;

        if (!id) {
            return res.status(400).json({
                msg: 'El ID es obligatorio',
                datos: [],
            });
        }

        const respuesta = await updateSkater(id, email, nombre, password, temporadaexperiencia, especialidad, foto, estado);
        res.status(respuesta.status).json({
            msg: respuesta.msg,
            datos: respuesta.datos,
        });
    } catch (error) {
        console.error('Error en updateSkaterController:', error.message);
        res.status(500).json({
            msg: 'Error del servidor',
            datos: [],
        });
    }
};


const deleteByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                msg: 'El ID es obligatorio',
                datos: [],
            });
        }

        const respuesta = await deleteById(id);

        if (!respuesta) {
            return res.status(404).json({
                msg: 'Skater no encontrado',
                datos: [],
            });
        }

        res.status(respuesta.status).json({
            msg: respuesta.msg,
            datos: respuesta.datos,
        });
    } catch (error) {
        console.error('Error en deleteByIdController:', error.message);
        res.status(500).json({
            msg: 'Error del servidor',
            datos: [],
        });
    }
};

module.exports = { findAllSkatersController, 
                createSkaterController,
                findByIdController,
                updateSkaterController,
                deleteByIdController 
            }