const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const routerUsuarios = require("./routes/usuarios.routes");
const routerReservas = require("./routes/reservas.routes");
const bodyParser = require('body-parser');
const fileuploader = require('express-fileupload');
const app = express();
const session = require('express-session');

// Configuraciones - Settings
app.set("name", "Red Tulum");
app.set("port", process.env.PORT || 3500);
app.set("views", path.join(__dirname, 'view/pages'));
app.set("view engine", "ejs"); //Motor de plantillas

//Aplicaciones entre cliente-servidor
app.use(express.json());

//Morgan es un middleware que permite ver las peticiones que se hacen al servidor - controla los clientes y los recursos que se estan usando
app.use(morgan("dev"));
app.use(morgan("common"));
app.use(fileuploader({createParentPath: true})); //para subir archivos
app.use(bodyParser.json()); //para recibir los datos en formato json
app.use(bodyParser.urlencoded({extended: false})); //para recibir datos del formulario
app.use(session({
    secret: 'elephant code',
    resave: false,
    saveUninitialized: true
})); // Session es un middleware que permite almacenar la sesión de un usuario

//LLamado de rutas
app.use(express.static("public"));
app.use("/api/usuarios", routerUsuarios);
app.use("/api/reservas", routerReservas);


//mongoDB conection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connectes to MongoDB Atlas"))
    .catch(error => console.error(error));


module.exports = app;