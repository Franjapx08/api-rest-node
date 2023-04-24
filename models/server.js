const express = require('express')
const cors = require('cors');

const { dbConnection } = require('../database/config');
const { createServer } = require('http');
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer( this.app );
        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            publicaciones: '/api/publicaciones'
        }
    
        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares(){

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );
        
        // Directorio publico
        this.app.use( express.static('public') );

    }

    routes(){
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios.js'));
        this.app.use( this.paths.publicaciones, require('../routes/publicaciones.js'));
    }

    sockets() {
        this.io.on('connection', ( socket ) => socketController(socket, this.io ) )
    }

    listen(){
        this.server.listen(this.port, () =>{
            console.log(`Example app listening at http://localhost:${this.port}`);
        });
    }

}

module.exports = Server;