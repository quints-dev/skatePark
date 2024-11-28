const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const createUser = async (email, nombre, password, role = 'USER') => {
    try {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcryptjs.hashSync(password, salt);

        const user = await User.create({
            email,
            nombre,
            password: hashedPassword,
            role,
        });

        return {
            msg: 'Usuario creado exitosamente.',
            status: 201,
            data: user,
        };
    } catch (error) {
        console.error('Error en createUser:', error.message);
        return {
            msg: 'Error al crear el usuario.',
            status: 500,
            data: null,
        };
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.findAll();
        return {
            msg: 'Usuarios obtenidos exitosamente.',
            status: 200,
            data: users,
        };
    } catch (error) {
        console.error('Error en getAllUsers:', error.message);
        return {
            msg: 'Error al obtener los usuarios.',
            status: 500,
            data: [],
        };
    }
};

const getUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return {
                msg: `No se encontró el usuario con ID ${id}.`,
                status: 404,
                data: null,
            };
        }
        return {
            msg: 'Usuario encontrado.',
            status: 200,
            data: user,
        };
    } catch (error) {
        console.error('Error en getUserById:', error.message);
        return {
            msg: 'Error al obtener el usuario.',
            status: 500,
            data: null,
        };
    }
};

const updateUser = async (id, update) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return {
                msg: `No se encontró el usuario con ID ${id}.`,
                status: 404,
                data: null,
            };
        }

        await user.update(update);
        return {
            msg: 'Usuario actualizado exitosamente.',
            status: 200,
            data: user,
        };
    } catch (error) {
        console.error('Error en updateUser:', error.message);
        return {
            msg: 'Error al actualizar el usuario.',
            status: 500,
            data: null,
        };
    }
};

const deleteUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return {
                msg: `No se encontró el usuario con ID ${id}.`,
                status: 404,
                data: null,
            };
        }

        await user.destroy();
        return {
            msg: 'Usuario eliminado exitosamente.',
            status: 200,
            data: null,
        };
    } catch (error) {
        console.error('Error en deleteUser:', error.message);
        return {
            msg: 'Error al eliminar el usuario.',
            status: 500,
            data: null,
        };
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
