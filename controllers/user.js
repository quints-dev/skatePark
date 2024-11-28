const { createUser, getAllUsers, getUserById, updateUser, deleteUser} = require('../service/user');

const createUserController = async (req, res) => {
    const { email, nombre, password, role } = req.body;

    const response = await createUser(email, nombre, password, role);
    res.status(response.status).json({ msg: response.msg, data: response.data });
};

const getAllUsersController = async (req, res) => {
    const response = await getAllUsers();
    res.status(response.status).json({ msg: response.msg, data: response.data });
};

const getUserByIdController = async (req, res) => {
    const { id } = req.params;
    const response = await getUserById(id);
    res.status(response.status).json({ msg: response.msg, data: response.data });
};

const updateUserController = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const response = await updateUser(id, updates);
    res.status(response.status).json({ msg: response.msg, data: response.data });
};

const deleteUserController = async (req, res) => {
    const { id } = req.params;

    const response = await deleteUser(id);
    res.status(response.status).json({ msg: response.msg, data: response.data });
};

module.exports = {
    createUserController,
    getAllUsersController,
    getUserByIdController,
    updateUserController,
    deleteUserController,
};
