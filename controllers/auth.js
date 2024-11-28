const login = require('../service/auth');

const loginController = async (req, res) => {
    const {nombre, password } = req.body;
    const response = await login(nombre, password);
    res.status(200).json(response);
}

module.exports = loginController;