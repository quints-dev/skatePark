const Skater = require("../models/skater");

const validarIdExiste = async (id) => {
    const existe = await Skater.findOne({
        where: { id }
    });
    if (!existe) {
        throw new Error(`El id ${id} no existe`);
    }
};

const nombreSkaterExiste = (nombreSkater) => {
    const nombreSkaterExiste = Skater.findOne({ where: { nombreSkater } });
    if(nombreSkaterExiste){
        throw new Error(`El nombre de skater ${nombreSkater} ya existe`);
    }
}

module.exports = {
    validarIdExiste, 
    nombreSkaterExiste
};