var express = require('express');
var router = express.Router();

const conexionBase = require('../conexionBase');
const connection = conexionBase();

/* GET PARA RENDERIZAR LA PÁGINA DE INICIO */
router.get('/', function(req, res, next) {
  res.render('inicio');
});

/* GET PARA VER LA LISTA DE LOS USUARIOS */
router.get('/users', function(req, res, next) {
  connection.query('SELECT * FROM usuarios', (err, result) => {
    console.log('consulta: ',result);
    res.render('lista_usuarios', {lista: result});
  });
});

/* GET PARA REDIRIGIR A AÑADIR USUARIOS */
router.get('/add_user', function(req, res, next) {
  res.render('usuarios/add_usuario');
});

/* GET PARA BORRAR USUARIOS */
router.get('/users/borrar/:id', async(req, res, next) => {
  const { id } = req.params;
  console.log('id del usuario a borrar ', id)
  await connection.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) =>{
    console.log(err);
    console.log(result);
  });
  res.redirect('/users');
});


/* POST PARA AÑADIR NUEVOS USUARIOS */
router.post('/add_user', function(req, res, next) {
  const { username, full_name, email, contrasenya } = req.body;
  connection.query('INSERT INTO usuarios SET ?', {
    username: username,
    full_name: full_name,
    email: email,
    contrasenya: contrasenya
  }), (err, result) => {
    console.log(result);
    console.log(err);
  }
  console.log('Nombre de usuario:',username,'con nombre:',full_name,'correo:',email,'contraseña:',contrasenya)
  res.redirect('/users');
});


/* GET PARA CARGAR LOS DATOS DE UN USUARIO YA EXISTENTE Y PODER MODIFICARLOS */
router.get('/users/editar/:id', async(req, res, next) => {
  const { id } = req.params;
  await connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, result) => {
    console.log('Errores', err);
    console.log('Consulta',result);
    res.render('usuarios/edit_usuario', {producto: result[0]});
  });
});




module.exports = router;
