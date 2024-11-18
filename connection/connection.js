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