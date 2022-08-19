const { Router } = require('express');
const ctrUsuarios = require('../controllers/usuarios.controller');
const usuariosSchema = require('../models/usuarios');
const routerUsuarios = Router();
const {auth} = require("../middleware/auth");

//AUTENTICAR USUARIOS - cuando doy a iniciar sesion
//routerUsuarios.post('/', ctrUsuarios.iniciarSesion);

//CLIENTES
routerUsuarios.get('/', ctrUsuarios.obtener);

//REGISTRARSE CLIENTE
routerUsuarios.post('/register', ctrUsuarios.registrarse);

//INICIAR SESION - AUTENTICAR USUARIO
routerUsuarios.post('/authenticate', ctrUsuarios.iniciarSesion);

//METODO POST - DATOS RECIBIDOS POR EL CLIENTE -
routerUsuarios.post('/', ctrUsuarios.agregar);

//PUTS - ACTUALIZAR DATOS
routerUsuarios.put('/:id', ctrUsuarios.actualizar);


//DELETE - ELIMINAR DATOS
routerUsuarios.delete('/:id', ctrUsuarios.eliminar);


module.exports = routerUsuarios;