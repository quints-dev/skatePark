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
