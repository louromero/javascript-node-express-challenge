const { Router }= require('express');
const ctrReservas = require('../controllers/reservas.controller');

const routerReservas = new Router();

//Obtener
routerReservas.get('/:idUsuario', ctrReservas.obtenerReservas);

//Obtener datos de una reserva teniendo el id de la reserva
routerReservas.get('/:idUsuario/:idReserva', ctrReservas.reserva);

//Agregar
routerReservas.post('/:idUsuario', ctrReservas.agregarReserva);

//Eliminar reserva
routerReservas.delete('/:idUsuario/:idReserva', ctrReservas.eliminarReserva);

//Actualizar reserva
routerReservas.put('/:idUsuario/:idReserva', ctrReservas.actualizarReserva);

module.exports = routerReservas;