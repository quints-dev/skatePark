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