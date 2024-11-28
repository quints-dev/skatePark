const { Router } = require('express');
const { 
    createSkaterController, 
    findAllSkatersController, 
    findByIdController, 
    updateSkaterController, 
    deleteByIdController 
} = require('../controllers/skater');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarIdExiste, nombreSkaterExiste } = require('../helpers/validador-db');

const router = Router();

// Crear un nuevo skater
router.post('/', [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La clave debe tener entre 5 y 10 caracteres').isLength({ min: 5, max: 10 }),
    check('temporadasexperiencia', 'Ingresa las temporadas de experiencia').not().isEmpty(),
    check('especialidad', 'La especialidad es obligatoria').not().isEmpty(),
    check('foto', 'La foto es obligatoria').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    validarCampos
], createSkaterController);

// Actualizar un skater
router.put('/:id', [
    check('id', 'El ID debe ser un número válido').isInt(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La clave debe tener entre 5 y 10 caracteres').isLength({ min: 5, max: 10 }),
    check('temporadasexperiencia', 'Ingresa las temporadas de experiencia').not().isEmpty(),
    check('especialidad', 'La especialidad es obligatoria').not().isEmpty(),
    check('foto', 'La foto es obligatoria').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    validarCampos
], updateSkaterController);

// Obtener todos los skaters
router.get('/', findAllSkatersController);

// Obtener un skater por ID
router.get('/:id', [
    check('id', 'El ID debe ser un número válido').isInt(),
    validarCampos
], findByIdController);

// Eliminar un skater por ID
router.delete('/:id', [
    check('id', 'El ID debe ser un número válido').isInt(),
    validarCampos
], deleteByIdController);

module.exports = router;
