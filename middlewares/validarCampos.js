const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: 'Errores en los campos enviados',
            errors: errors.array(),
        });
    }
    next(); // Si no hay errores, pasa al siguiente middleware/controlador
};

module.exports = { validarCampos };
