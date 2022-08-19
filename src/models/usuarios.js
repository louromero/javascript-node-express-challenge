//Conexion con la BD
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // sirve para encriptar la contraseña

const usuariosSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    reservas: [
        {
            origen: {
                type: String,
                required: true
            },
            destino: {
                type: String,
                required: true
            },
            fecha: {
                type: Date,
                required: true
            },
            hora: {
                type: String,
                required: true
            },
            duracion: {
                type: String,
                required: true
            },
            //Por si se elimina una reserva y se quiere recuperar
            activo: {
                type: Boolean,
                default: true
            }
        }
    ]
});

//Encriptar la contraseña
usuariosSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        const document = this;
        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
            if (err) {
                next(err);

            } else {
                document.password = hashedPassword;
                next();
            }
        });

    } else {
        next();
    }
});

//Comparar contraseña - Es un middleware que se ejecuta antes de cualquier otra acción - Es correcta la contraseña
usuariosSchema.methods.compararClave = function (password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            callback(err);
        } else {
            callback(null, isMatch);
        }
    }
    );
}

module.exports = model('Usuario', usuariosSchema);