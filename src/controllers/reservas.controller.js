const Usuario = require('../models/usuarios');

exports.obtenerReservas = async (req, res) => {
    try {
        if (req.params.idUsuario) {
            const idUsuario = req.params.idUsuario;
            const usuario = await Usuario.findById(idUsuario);
            res.json(usuario.reservas);
        } else {
            res.status(400).json({error: "Debe enviar el ID del usuario"});
        }
    } catch (error) {
        res.json(error);
    }
}

//Obtener datos de la reserva teniendo el id del usuario y la reserva
exports.reserva = async (req, res) => {
    try {
        if (req.params.idUsuario && req.params.idReserva) {
            const idUsuario = req.params.idUsuario;
            const idReserva = req.params.idReserva;
            const usuario = await Usuario.findById(idUsuario);
            const reserva = usuario.reservas.id(idReserva);
            res.json(reserva);
        } else {
            res.status(400).json({error: "Debe enviar el ID del usuario y la reserva"});
        }
    } catch (error) {
        res.json(error);
    }
};

exports.agregarReserva = async (req, res) => {
    try {
        if (req.params.idUsuario && req.body) {
            const idUsuario = req.params.idUsuario;
            const reservas = req.body;
            const usuario = await Usuario.findById(idUsuario);
            //push agrega un nuevo elemento al array
            usuario.reservas.push(reservas);
            await usuario.save();
            res.json(usuario);
        } else {
            res.status(400).json({error: "Debe enviar el ID del usuario"});
        }
    } catch (error) {
        res.json(error);
    }
}

exports.eliminarReserva = async (req, res) => {
    try {
        if (req.params.idUsuario && req.params.idReserva) {
            const idUsuario = req.params.idUsuario;
            const idReserva = req.params.idReserva;
            const usuario = await Usuario.findById(idUsuario);
            //elimina el elemento del array que coincida con el id
            usuario.reservas.id(idReserva).remove();
            await usuario.save();
            res.json(usuario);
        } else {
            res.status(400).json({error: "Debe enviar el ID del usuario y la reserva"});
        }
    } catch (error) {
        res.json(error);
    }
}

exports.actualizarReserva = async (req, res) => {
    try{
        if(req.params.idUsuario && req.params.idReserva && req.body){
            const idUsuario = req.params.idUsuario;
            const idReserva = req.params.idReserva;
            const reserva = req.body;
            const usuario = await Usuario.findById(idUsuario);
            //busca el elemento del array que coincida con el id
            const reservaActualizada = usuario.reservas.id(idReserva);
            reservaActualizada.set(reserva);
            await usuario.save();
            res.json(usuario);
        }else{
            res.status(400).json({error: "Debe enviar el ID del usuario y la reserva"});
        }
    } catch (error) {
        res.json(error);
    }
}

//Buscar datos de la reserva teniendo el idReserva
exports.reserva = async (req, res) => {
    try {
        if (req.params.idUsuario && req.params.idReserva) {
            const idUsuario = req.params.idUsuario;
            const idReserva = req.params.idReserva;
            const usuario = await Usuario.findById(idUsuario);
            const reserva = usuario.reservas.id(idReserva);
            res.json(reserva);
        } else {
            res.status(400).json({error: "Debe enviar el ID del usuario y la reserva"});
        }
    } catch (error) {
        res.json(error);
    }
}