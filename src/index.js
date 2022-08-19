const app = require('./app');
const fetch = require('node-fetch');

app.get("/", (req, res) => {
  res.render("index.ejs", { title: "Red Tulum" });
});

//INICIAR SESIÓN
app.get("/login", async (req, res) => {
  res.render("iniciarSesion", { title: "Red Tulum", success: true });
});

app.post("/authenticate", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.render("iniciarSesion", { title: "Error" });
  } else {

    let respuesta = await fetch('http://localhost:3500/api/usuarios/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    }).then(response => {
      return response.json();
    }).catch(err => { console.log(err); });

    if (respuesta.isOk) {
      //Guardar en session el usuario
      req.session.usuario = respuesta.usuario;
      res.render("reservas.ejs", { title: "Red Tulum", usuario: respuesta.usuario, id: respuesta.usuario._id });
    }
    else {
      res.render("iniciarSesion.ejs", { conexion: "Error al iniciar sesión.", conexion2: "Correo o contraseña incorrecta.", success: false });
      //res.send("Error :D")
    }

  }
});

//REGISTRARSE
app.get("/registrate", async (req, res) => {
  res.render("registrarse", { title: "Red Tulum" });
});

app.post("/register", async (req, res) => {
  //res.render("reservas.ejs", { title: "Red Tulum" });

  if (!req.body.email || !req.body.password || !req.body.nombre) {
    res.render("registrarse", { conexion: "Error!", conexion2: "No se completaron todos los rangos.", success: false });
  } else {

    let respuesta = await fetch('http://localhost:3500/api/usuarios/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    }).then(response => {
      return response.json();
    }).catch(err => { console.log(err); });

    if (respuesta.isOk) {
      res.render("iniciarSesion.ejs", { conexion: "Su registro fue un éxito.", conexion2: "Inicie Sesión nuevamente.", success: true });
    }
    else {
      res.render("iniciarSesion.ejs", { conexion: "Error al registrarse.", conexion2: "Hubo un error al registrarse. Intente nuevamente..", success: false });
      //res.send("Error :D")
    }

  }
})

//MIS RESERVAS
app.get("/mis_reservas", async (req, res) => {
  //Obtener datos del usuario desde session
  let usuario = req.session.usuario;
  console.log("Mis Reservas");
  //Obtener reservas del usuario
  let respuesta = await fetch('http://localhost:3500/api/reservas/' + usuario._id, {})
    .then(response => {
      return response.json();
    }).catch(err => { console.log(err); });
  res.render("mis_reservas", { respuesta, title: "Red Tulum", editar: false });

});

//EDITAR RESERVAS
app.get("/editar_reserva/:idReserva", async (req, res) => {
  //Obtener datos del usuario desde session
  let id = req.params.idReserva;
  let usuario = req.session.usuario;
  console.log("Editar Reserva");
  //Obtener reservas del usuario enviando como parametros el id del usuario y el id de la reserva
  let respuesta = await fetch('http://localhost:3500/api/reservas/' + usuario._id + '/' + id, {})
    .then(response => {
      return response.json();
    }).catch(err => {
      console.log(err);
    });
  //Enviar un activado=true para que se pueda editar la reserva
  res.render("editar_reservas", { respuesta, title: "Red Tulum", editar: true, idReserva: req.params.idReserva });
});

//ACTUALIZAR LOS DATOS DE LA RESERVA - POST
app.post("/actualizar_reserva/:idReserva", async (req, res) => {
  //Update de los valores obtenidos del formulario
  let id = req.params.idReserva;
  let usuario = req.session.usuario;
  let respuesta = await fetch('http://localhost:3500/api/reservas/' + usuario._id + '/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  }).then(response => {
    return response.json();
  }).catch(err => { console.log(err); });
  res.redirect("/mis_reservas");
});

//ELIMINAR RESERVA
app.get("/eliminar_reserva/:idReserva", async (req, res) => {
  //Delete reserva del usuario
  let id = req.params.idReserva;
  let usuario = req.session.usuario;
  let respuesta = await fetch('http://localhost:3500/api/reservas/' + usuario._id + '/' + id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }).then(response => {
    return response.json();
  }).catch(err => { console.log(err); });
  res.redirect("/mis_reservas");
});

//NUEVA RESERVA
app.get("/nueva_reserva", async (req, res) => {
  res.render("nueva_reserva");
});

//CREAR NUEVA RESERVA - POST
app.post("/crear_reserva", async (req, res) => {
  //Crear reserva que el usuario ingreso en el formulario de nueva reserva
  let usuario = req.session.usuario;
  let respuesta = await fetch('http://localhost:3500/api/reservas/' + usuario._id, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  }).then(response => {
    return response.json();
  }).catch(err => { console.log(err); });
  res.redirect("/mis_reservas");
});

//BUSCAR RESERVAS
app.get("/buscar_reserva", async (req, res) => {
  res.render("buscar_reserva");
});

//BUSCAR RESERVA POR ID DE RESERVA INGRESADO POR EL USUARIO - POST
app.post("/buscar_reserva", async (req, res) => {
  //Buscar reserva por id de reserva ingresado por el usuario
  let usuario = req.session.usuario;
  let respuesta = await fetch('http://localhost:3500/api/reservas/' + usuario._id + '/' + req.body.idReserva, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(response => {
    return response.json();
  }) .catch(err => { console.log(err); });
  res.render("buscar_reserva", { respuesta, title: "Red Tulum" });
});

app.listen(app.get('port'), () => {
  console.log(`Example app listening on port ${app.get('port')}!`);
  console.log(`Nombre de la empresa: ${app.get("name")}`);
});