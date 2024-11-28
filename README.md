Crear una API REST con el Framework Express. 
● Servir contenido dinámico con express-handlebars. 
● Ofrecer la funcionalidad Upload File con express-fileupload. 
● Implementar seguridad y restricción de recursos o contenido con JWT. Descripción La Municipalidad de Santiago, ha organizado una competencia de Skate para impulsar el nivel deportivo de los jóvenes que desean representar a Chile en los X Games del próximo año, y han iniciado con la gestión para desarrollar la plataforma web en la que los participantes se podrán registrar y revisar el estado de su solicitud En esta prueba deberás ocupar todos tus conocimientos para desarrollar un sistema que involucre tus habilidades como Full Stack Developer, consolidando tus competencias en el frontend y backend. Las tecnologías y herramientas que deberás ocupar son las siguientes: - Express - Handlebars - PostgreSQL - JWT - Express-fileupload

Consideraciones: ● El sistema debe permitir registrar nuevos participantes. 
● Se debe crear una vista para que los participantes puedan iniciar sesión con su correo y contraseña. 
● Luego de iniciar la sesión, los participantes deberán poder modificar sus datos, exceptuando el correo electrónico y su foto. Esta vista debe estar protegida con JWT y los datos que se utilicen en la plantilla deben ser extraídos del token. 
● La vista correspondiente a la ruta raíz debe mostrar todos los participantes registrados y su estado de revisión.
 ● La vista del administrador debe mostrar los participantes registrados y permitir aprobarlos para cambiar su estado. Se debe persistir la información de los usuarios en PostgreSQL, por lo que deberás usar las siguientes sentencias SQL para la creación de la base de datos y la tabla de participantes. 

CREATE DATABASE skatePark;  CREATE TABLE skaters (id SERIAL, email VARCHAR(50) NOT NULL, nombre VARCHAR(25) NOT NULL, password VARCHAR(25) NOT NULL, anos_experiencia INT NOT NULL, especialidad VARCHAR(50) NOT NULL, foto VARCHAR(255) NOT NULL, estado BOOLEAN NOT NULL); 

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE, 
    nombre VARCHAR(100) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    role VARCHAR(50) NOT NULL DEFAULT 'USER', 
    activo BOOLEAN DEFAULT TRUE 
);


Requerimientos 
1. Crear una API REST con el Framework Express 
 2. Servir contenido dinámico con express-handlebars 
3. Ofrecer la funcionalidad Upload File con express-fileupload 
4. Implementar seguridad y restricción de recursos o contenido con JWT


npm init -y : para iniciar npm

npm i express express-handlebars express-fileupload pg jsonwebtoken dotenv bcrypt sequelize pg-hstore 

project/
├── controllers/
│   └── skatersController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   └── connection.js
├── public/
│   ├── uploads/
└── views/
    ├── layouts/
├── routes/
│   └── skatersRoutes.js
├── index.js
└── package.json

require('dotenv').config();
const Server = require('./server/server');

const sequelize = require("./connection/connection")

// sincronizar
sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de datos sincronizada');
        
    })
    .catch((err) => {
        console.log('error');
        
    })





project/
├── connection/
|   ├── connection.js
├── routes/
│   ├── authRoutes.js          # Rutas de autenticación
│   ├── participantRoutes.js   # Rutas de skaters
│   └── adminRoutes.js         # Rutas de administrador
├── controllers/
│   ├── authController.js      # Lógica de autenticación
│   ├── participantController.js
│   └── adminController.js
├── services/
│   ├── authService.js         # Lógica relacionada con usuarios y login
│   ├── participantService.js skaters
│   └── adminService.js
├── middlewares/
│   └── authMiddleware.js      # Protección de rutas
├── views/
│   ├── partials/
│   ├── login/       # Página de inicio de sesión
│   ├── participants/
│   ├── admin/
│   └──  main.hbs    # Layout principal
├── public/
│   ├── css/                   # Archivos CSS
│   └── js/                    # Archivos JS
├── config/
│   └── database.js            # Configuración de PostgreSQL
├── .env                       # Variables de entorno (JWT_SECRET, etc.)
├── app.js                     # Configuración de Express
└── package.json


connection.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
}
);

sequelize
.authenticate()
.then(() => {
    console.log('Conexion a la base de datos exitosa');
    })
    .catch((err) => {
        console.log('No se puede conectar a la base de datos', err.message);
    });

module.exports = sequelize;

controllers
auth.js
const login = require('../service/auth');

const loginController = async (req, res) => {
    const {nombre, password } = req.body;
    const response = await login(nombre, password);
    res.status(200).json(response);
}

module.exports = loginController;

skater.js
const { findAllSkaters, findById, createSkater, updateSkater, deleteById } = require('../service/skater');

const findAllSkatersController = async (req, res) => {
    try {
        const response = await findAllSkaters();
        res.status(response.status).json({
            msg: 'Lista de Skaters obtenida',
            datos: response.datos,
        });
    } catch (error) {
        console.error('Error al obtener los skaters:', error.message);
        res.status(500).json({
            msg: 'Error del servidor',
            datos: [],
        });
    }
};

const findByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const respuesta = await findById(id);

        if (!respuesta) {
            return res.status(404).json({
                msg: 'Skater no encontrado',
                datos: [],
            });
        }

        res.status(respuesta.status).json({
            msg: respuesta.msg,
            datos: respuesta.datos,
        });
    } catch (error) {
        console.error('Error en findByIdController:', error.message);
        res.status(500).json({
            msg: 'Error del servidor',
            datos: [],
        });
    }
};


const createSkaterController = async (req, res) => {
    try {
        const { email, nombre, password, temporadaexperiencia, especialidad, foto, estado } = req.body;

        // Validación de campos obligatorios
        if (!email || !nombre || !password) {
            return res.status(400).json({
                msg: 'Faltan campos obligatorios',
                datos: [],
            });
        }

        const response = await createSkater(email, nombre, password, temporadaexperiencia, especialidad, foto, estado);
        res.status(response.status).json({
            msg: response.msg,
            datos: response.datos,
        });
    } catch (error) {
        console.error('Error en createSkaterController:', error.message);
        res.status(500).json({
            msg: 'Error del servidor',
            datos: [],
        });
    }
};


const updateSkaterController = async (req, res) => {
    try {
        const { id, email, nombre, password, temporadaexperiencia, especialidad, foto, estado } = req.body;

        if (!id) {
            return res.status(400).json({
                msg: 'El ID es obligatorio',
                datos: [],
            });
        }

        const respuesta = await updateSkater(id, email, nombre, password, temporadaexperiencia, especialidad, foto, estado);
        res.status(respuesta.status).json({
            msg: respuesta.msg,
            datos: respuesta.datos,
        });
    } catch (error) {
        console.error('Error en updateSkaterController:', error.message);
        res.status(500).json({
            msg: 'Error del servidor',
            datos: [],
        });
    }
};


const deleteByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                msg: 'El ID es obligatorio',
                datos: [],
            });
        }

        const respuesta = await deleteById(id);

        if (!respuesta) {
            return res.status(404).json({
                msg: 'Skater no encontrado',
                datos: [],
            });
        }

        res.status(respuesta.status).json({
            msg: respuesta.msg,
            datos: respuesta.datos,
        });
    } catch (error) {
        console.error('Error en deleteByIdController:', error.message);
        res.status(500).json({
            msg: 'Error del servidor',
            datos: [],
        });
    }
};

module.exports = { findAllSkatersController, 
                createSkaterController,
                findByIdController,
                updateSkaterController,
                deleteByIdController 
            }

helpers
generadorJWT.js

const jwt = require('jsonwebtoken');

const generarJWT = async (uid, expiresIn = '4h') => {
    try {
        // Validar que la clave secreta esté configurada
        if (!process.env.SECRETKEY) {
            throw new Error('La clave secreta (SECRETKEY) no está definida en las variables de entorno.');
        }

        // Crear el token
        const payload = { uid };
        const token = await jwt.sign(payload, process.env.SECRETKEY, { expiresIn });
        return token;
    } catch (err) {
        console.error('Error al generar el JWT:', err);
        throw new Error('No se pudo generar el token.');
    }
};

module.exports = generarJWT;

validador-db.js

const Skater = require('../models/skater');

// Validador para verificar si un ID existe en la base de datos
const validarIdExiste = async (id) => {
    const existeSkater = await Skater.findByPk(id);
    if (!existeSkater) {
        throw new Error(`El ID ${id} no existe en la base de datos`);
    }
};

// Validador para verificar si un nombre de Skater ya existe
const nombreSkaterExiste = async (nombre) => {
    const existeNombre = await Skater.findOne({ where: { nombre } });
    if (existeNombre) {
        throw new Error(`El nombre ${nombre} ya está registrado`);
    }
};

module.exports = validarIdExiste, nombreSkaterExiste ;

jwt.middleware.js

const jwt = require('jsonwebtoken');

const validacionToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                msg: 'No hay token, vuelve a intentar',
            });
        }

        const token = authHeader.split(' ')[1];


        const payload = jwt.verify(token, process.env.SECRETKEY);

        req.email = payload.email;

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            msg: 'No estás autorizado',
            datos: [],
        });
    }
};

module.exports = validacionToken;

validarCampos.js

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

skaters.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const Skater = sequelize.define('Skater', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    temporadasexperiencia: {
        type: DataTypes.INTEGER,
    },
    especialidad: {
        type: DataTypes.STRING,
    },
    foto: {
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'skaters',
    timestamps: false,
});

module.exports = Skater;

routes
auth.js
const { Router } = require('express');
const { loginController } = require('../controllers/auth');

const router = Router();

router.post('/login', loginController);

module.exports = router;

skater.js
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

server.js
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');
require('dotenv').config();

class Server {
    constructor(){
        this.app = express();
        this.port = 3000;
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.set('view engine', 'hbs');
        hbs.registerPartials(__dirname.slice(0, -7) + '/views/partials');
        this.app.use(express.static(path.join(__dirname, '../public')));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(fileUpload({
            limits: { fileSize: 5000000 },
            abortOnLimit: true,
            responseOnLimit: 'El archivo es demasiado grande'
        }));
    }

    routes(){
        this.app.use('/', require('../routes/skater'));
        this.app.use('/auth', require('../routes/auth'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;

service
auth.js

const bcryptjs = require('bcryptjs');
const Skater = require('../models/skater')
const { generarJWT } = require('../helpers/generadorJWT');

const login = async (nombre, password) =>{
try {
    const skater = await Skater.findOne({ where: { nombre }});
    if (!skater) {
        throw new Error('Skater no encontrado');
    }

    if(!skater.estado){
        throw new Error('Skater no activo');
    }

    const validacionPassword = bcryptjs.compareSync(password, skater.password);
    if(validacionPassword){
        throw new Error('Clave no válida');
    }

    const token = await generarJWT(skater.id);
    return{
        msg: 'Login exitoso',
        datos: {
            skater: {
                id: skater.id,
                nombre: skater.nombre,
                email: skater.email,
                estado: skater.estado,
            },
            token,
        },
    };
} catch (error) {
    console.log(error);
    return{
        msg: 'Error en el login',
        datos: []
    }
}
}
module.exports = login;

skater.js
const bcryptjs = require('bcryptjs');
const Skater = require('../models/skater');

const createSkater = async (email, nombre, password, temporadasexperiencia, especialidad, foto, estado) => {
    try {
        
        const salt = bcryptjs.genSaltSync();
        password = bcryptjs.hashSync(password, salt);
        
        const skater = await Skater.create({
            email, nombre, password, temporadasexperiencia, especialidad, foto, estado
        });
        return{
            msg: `El Skater ${nombre} ha clasificado `,
            status: 201,
            datos: []
        }
    } catch (error) {
        console.log(error);
        return{
            msg: 'Error al crear el skater',
            status: 500,
            datos: []
            };
        }
    }
    

const findAllSkaters = async () => {
try {
    const skaters = await Skater.findAll();
    return {
        msg: 'Skaters encontrados',
        status: 200,
        datos: skaters,
    };
} catch (error) {
    console.log('Error al obtener datos', error.message);
    return {
        msg: 'Error del servidor',
        status: 500,
        datos: [],
    };
    }
};

const findById = async (id) => {
    try {
        
        const skater = await Skater.findOne({
            where:{
                id: id
            }
        });
        if(!skater){
            return{
                msg:`El skater con id ${id} no existe`,
                status: 204,
                datos:[]
            }
        }
        return{
            msg: `Skater encontrado con id ${id}`,
            status: 200,
            datos: skater.toJSON()
        }
    } catch (error) {
    console.log(error);
    return{
        msg: 'Error en servidor',
        status: 500,
        datos: []
        }
    }
}


const updateSkater = async (id, email, nombre, password, temporadasexperiencia, especialidad, foto, estado) => {
try {
    
    await Skater.update({ id, email, nombre, password, temporadasexperiencia, especialidad, foto, estado }, {where:{ id }});
} catch (error) {
    console.log(error);
    
    return error.message
    }
}

const deleteById = async (id) => {
    try {
        // Verificar si el skater existe
        const skater = await Skater.findOne({
            where: { id }
        });

        // Si no existe el skater
        if (!skater) {
            return {
                msg: `Skater con id ${id} no existe`,
                status: 400,
                datos: []
            };
        }

        // Eliminar el skater
        const result = await Skater.destroy({
            where: { id }
        });

        // Si no se eliminó ningún skater, retornar un error
        if (result === 0) {
            return {
                msg: `No se pudo eliminar el skater con id ${id}`,
                status: 400,
                datos: []
            };
        }

        // Respuesta de éxito
        return {
            msg: `Skater con id ${id} eliminado con éxito`,
            status: 200,
            datos: []
        };

    } catch (error) {
        console.log('Error al eliminar el skater:', error.message);
        return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        };
    }
};



module.exports = {
                createSkater,
                findAllSkaters,
                findById,
                updateSkater,
                deleteById
                };

.env
DB_USERNAME=postgres
DB_PASSWORD=1234
DB_HOST=localhost
DB_PORT=5432    # Cambia el puerto según tu base de datos (3306 para MySQL, 5432 para PostgreSQL, etc.)
DB_DATABASE=skatePark
DB_DIALECT=postgres     

index.js
const Server = require("./server/server");

const server = new Server();

server.listen();

