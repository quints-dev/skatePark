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
        this.app.use('/api/users', require('../routes/user'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;