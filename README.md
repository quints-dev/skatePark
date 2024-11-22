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

connection.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

sequelize
.authenticate()
.then(() => {
    console.log('Conexion a la base de datos exitosa');
    })
    .catch((err) => {
        console.log('No se puede conectar a la base de datos');
    });

module.exports = sequelize;

controllers
const { createSkater } = require('../service/skater');

const createSkaterController = async (req, res) => {
    try {
        const { email, nombre, password, temporadaexperiencia, especialidad, foto, estado} = req.body;
    if(!email || !nombre || !password){
        return res.status(400).json({
            msg: 'Faltan campos obligatorios',
            datos: []
        });
    }
    const response = await createSkater(email, nombre, password, temporadaexperiencia, especialidad, foto, estado);
    res.status(response.status).json({
        msg: response.msg,
        datos: response.datos
    });
    } catch (error) {
        console.log('Error en controlador', error);
        res.status(500).json({
            msg: 'Error del servidor',
            datos:[]
        })
        
    }
}

module.exports = createSkaterController

helpers
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


models
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


routes
const { Router } = require('express');
const createSkaterController = require('../controllers/skater');


const router = Router();

router.post('', createSkaterController);

module.exports = router; 

server
const express = require('express');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');
require('dotenv').config();

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json());
    }

    routes(){
        this.app.use('/skater', require('../routes/skater'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;

service
const Skater = require('../models/skater');


const createSkater = async (email, nombre, password, temporadasexperiencia, especialidad, foto, estado) => {
try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const skater = await Skater.create({
        email, 
        nombre, 
        password: hashedPassword,
        temporadasexperiencia,
        especialidad,
        foto,
        estado
    });
    return{
        msg: 'Skater creado exitosamente',
        status: 201,
        datos: skater.toJSON()
    }
} catch (error) {
    return{
        msg: 'Error al crear el skater',
        status: 500,
        datos: []
    }
}
}

module.exports = createSkater;

index
const Server = require("./server/server");

const server = new Server();

server.listen();


