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
        type: DataTypes.STRING,
        defaultValue: false,
    },
}, {
    timestamps: true,
});

module.exports = Skater;
