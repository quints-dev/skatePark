const { validationResult } = require('express-validator');

const validarCampos = (req, res, next ) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            msg: 'Errores de validacion',
            errores: errores.array(),
        });
    }
    next();
};

module.exports = validarCampos;  //exportar la funcion para que se pueda usar en otros archivos.