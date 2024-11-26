const { Router } = require('express');
const { check } = require('express-validator');
const { createSkaterController, findByIdController, findAllSkatersController } = require('../controllers/skater');
const validarCampos = require('../middlewares/validarCampos');

const router = Router();

// Ruta para crear un nuevo skater
router.post(
    '/',
    [
        check('email', 'El email es obligatorio y debe tener un formato válido').isEmail(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
        check('temporadasexperiencia', 'La experiencia debe ser un número válido').isNumeric(),
        check('especialidad', 'La especialidad es obligatoria').not().isEmpty(),
        validarCampos,
    ],
    createSkaterController
);

// Ruta para obtener un skater por ID
router.get(
    '/:id',
    [
        check('id', 'El ID debe ser un número válido').isInt(),
        validarCampos,
    ],
    findByIdController
);

// Ruta para obtener todos los skaters
router.get('/', findAllSkatersController);

module.exports = router;
