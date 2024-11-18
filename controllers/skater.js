const { createSkater } = require('../service/skater');

const createSkaterController = async (req, res) => {
    try {
        const { email, nombre, password, temporadaexperiencia, especialidad, foto, estado} = req.body;
    if(!email || !nombre || !password){
        return res.status(400).json({
            msg: 'Faltan campos obligatorios',
            datos: []
        });
    }
    const response = await createSkater(email, nombre, password, temporadaexperiencia, especialidad, foto, estado);
    res.status(response.status).json({
        msg: response.msg,
        datos: response.datos
    });
    } catch (error) {
        console.log('Error en controlador', error);
        res.status(500).json({
            msg: 'Error del servidor',
            datos:[]
        })
        
    }
}

module.exports = createSkaterController