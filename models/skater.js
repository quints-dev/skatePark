const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const Skater = sequelize.define('Skater', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
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
        allowNull: false,
    },
    especialidad: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
});

module.exports = Skater;
