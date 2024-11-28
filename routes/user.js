const { Router } = require('express');
const {
    createUserController,
    getAllUsersController,
    getUserByIdController,
    updateUserController,
    deleteUserController,
} = require('../controllers/user');
const { validarToken, verificarRol } = require('../middlewares/authMiddleware');

const router = Router();

// Rutas de usuario general
router.post('/', validarToken, verificarRol('ADMIN'), createUserController); // Crear usuario (solo admin)
router.get('/', validarToken, verificarRol('ADMIN'), getAllUsersController); // Obtener todos los usuarios
router.get('/:id', validarToken, getUserByIdController); // Obtener usuario por ID
router.put('/:id', validarToken, updateUserController); // Actualizar usuario
router.delete('/:id', validarToken, verificarRol('ADMIN'), deleteUserController); // Eliminar usuario

module.exports = router;
