const login = require('../service/auth'); // Ajusta la ruta según tu estructura

const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const response = await login(email, password); // Llama al servicio para manejar la lógica de autenticación
        res.status(200).json(response);
    } catch (error) {
        console.error('Error en loginController:', error.message);
        res.status(500).json({ msg: 'Error en el servidor.' });
    }
};

module.exports = loginController;
