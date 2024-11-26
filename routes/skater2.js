const { Router } = require('express');
const { check } = require('express-validator');
const { updateSkaterController, deleteByIdController } = require('../controllers/skater');
const validarCampos = require('../middlewares/validarCampos');
const validacionToken = require('../middlewares/jwt.middleware');

const router = Router();

// Ruta para actualizar un skater
router.put(
    '/',
    [
        validacionToken, // Middleware para validar token JWT
        check('id', 'El ID es obligatorio y debe ser un número').isInt(),
        check('email', 'El email no puede ser modificado').isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').optional().isLength({ min: 6 }),
        validarCampos,
    ],
    updateSkaterController
);

// Ruta para eliminar un skater
router.delete(
    '/:id',
    [
        validacionToken, // Middleware para validar token JWT
        check('id', 'El ID debe ser un número válido').isInt(),
        validarCampos,
    ],
    deleteByIdController
);

module.exports = router;
