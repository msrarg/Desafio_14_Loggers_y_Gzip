require('dotenv').config();
const cors = require('cors');
const express = require('express');
const compression = require('compression')

const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser')

const argv = require('../config/config.yargs');
const { dbConnectionMongoAtlas } = require('../database/db-config');
const { sessionMongoDB }         = require('../config/config.session.js');
const { initializePassport }     = require('../config/config.passport.js');
const { infoLogger, warnLogger } = require("../middlewares/logger");

class Server {
    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.authPath   = '/api/auth';
        this.randomPath = '/api/randoms';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnectionMongoAtlas();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        // this.app.use(express.urlencoded({ extendedparser : true })); Deprecado
        
        // Equivalentes en bodyparser
        // this.app.use(bodyParser.json())
        // this.app.use(bodyParser.urlencoded({ extended: true }));    
        
        // Cookie middlewares
        this.app.use(cookieParser());

        // Directorio publico
        // this.app.use(express.static('public')); // Ruta de la carpeta public
        // this.app.use(express.static(path.join(__dirname, '/views')));
        // this.app.use(express.static(path.join(__dirname, 'public')));

        this.app.use(sessionMongoDB);
        initializePassport();
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        // Compresión de respuestas
        this.app.use(compression({
            level: -1 // Default compression level (also zlib.Z_DEFAULT_COMPRESSION).
            }
        ));
    }

    routes() {
        this.app.use("/", infoLogger, require("../routes/info"));
        this.app.use("*", warnLogger);

        // this.app.use( this.authPath,     require('../routes/auth.routes'));
        // this.app.use('/',                require('../routes/info.routes'));
        // this.app.use( this.randomPath,   require('../routes/randoms.routes'));
    }

    listen(port) {
        this.port = port;
        this.app.listen( this.port, () => {
            console.log(`Server up on port: ${this.port} in process ID:(${process.pid})`); 
        });

        this.app.on('error', (error) => console.log(error));
    }
}

module.exports = Server;
