var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.render('inicio');
});

router.get('/users', function(req, res, next) {
  connection.query('SELECT * FROM productos', (err, result) => {
      // console.log('consulta: ',result);
      res.render('lista_coches', {lista: result});
  });
});

router.get('/add_user', function(req, res, next) {
  res.render('usuarios/add_usuario');
});

router.post('/add_car', function(req, res, next) {
  const { username, nombre, email, password } = req.body;
  connection.query('INSERT INTO productos SET ?', {
      username: username,
      nombre: nombre,
      email: email,
      password: password
  }), (err, result) => {
      console.log(result);
      console.log(err);
  }
  console.log('Nombre de usuario:',username,'con nombre:',nombre,'correo:',email,'contraseña:',password)
  res.redirect('/users');
});


module.exports = router;
