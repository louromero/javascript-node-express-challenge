const Usuario = require("../models/usuarios");

//Autenticar usuario
exports.iniciarSesion = async (req, res) => {
    try {
        const {email, password} = req.body;
        const usuario = await Usuario.findOne({email});
        if (usuario){
            //Si se encontró
            usuario.compararClave(password, (err, result) => {
                console.log(err, result);
                if (result){
                    //return res.json({msj:"Usuario autenticado correctamente", isOk: true});
                    return res.json({usuario, isOk: true});
                    //res.render("reservas.ejs", {title: "Red Tulum"});
                }else{
                    return res.json({msj:"Clave incorrecta", isOk: false});   
                }
            })
            
        }else{
            return res.json({msj:"Usuario no encontrado", isOk: false});
        }
    } catch (error) {
        res.json(error);
        console.log(error);
    }
}

exports.registrarse = async (req, res) => {
    const {nombre, email, password} = req.body;
    const nuevoUsuario = new Usuario ({nombre, email, password});
    nuevoUsuario.save(err =>{
        if (err){
            res.json({msj:"Error al registrar el usuario", isOk: false});
        }else{
            res.json({msj:"Usuario registrado de forma satisfactoria", isOk: true});
            res.render("iniciarSesion", {title: "Red Tulum"});
        }
    });
};

//Obtener datos del usuario que inició sesión
exports.obtener = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const usuario = await Usuario.findById(id);
        res.json(usuario);
    } catch (error) {
        res.json(error);
        console.log(error);
    }
};

exports.agregar = async (req, res) => {

    try {
        const {nombre, email, password, reservas} = req.body;
        console.log(nombre, email, reservas);

        const nuevoUsuario = new Usuario ({nombre, email, password, reservas});

        await nuevoUsuario.save();

        res.json({msj:"Registro insertado de forma satisfactoria", id: nuevoUsuario._id});
    } catch (error) {
        res.json(error);
        console.log(error);
    }
};

exports.actualizar = async (req, res) => {
    
    try {
        const id = req.params.id;
        const data = req.body;

        if (id && data){
            await Usuario.findByIdAndUpdate(id, data);
            res.json("Registro actualizado");
        }else{
            res.json({msj:"Error al actualizar el registro"});
        }
        
    } catch (error) {
        res.json(error);
        console.log(error);
    }
    
};

exports.eliminar = async (req, res) => {
    try {
        //Parametro que recibimos del cliente
        const id = req.params.id;
        console.log(id);
        const eliminado = await Usuario.findByIdAndUpdate(id, {activo: false});
        res.json({msj:"Registro eliminado de forma satisfactoria", isOk: true});
    } catch (error) {
        res.json(error);
        console.log(error);
    }
};
