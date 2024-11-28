const Skater = require('../models/skater');

// Validador para verificar si un ID existe en la base de datos
const validarIdExiste = async (id) => {
    const existeSkater = await Skater.findByPk(id);
    if (!existeSkater) {
        throw new Error(`El ID ${id} no existe en la base de datos`);
    }
};

// Validador para verificar si un nombre de Skater ya existe
const nombreSkaterExiste = async (nombre) => {
    const existeNombre = await Skater.findOne({ where: { nombre } });
    if (existeNombre) {
        throw new Error(`El nombre ${nombre} ya está registrado`);
    }
};

module.exports = validarIdExiste, nombreSkaterExiste ;

