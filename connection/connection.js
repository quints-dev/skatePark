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