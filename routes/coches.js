var express = require('express');
var router = express.Router();

const conexionBase = require('../conexionBase');
const connection = conexionBase();

if (connection) console.log('conectado a la tabla de coches')


/* GET users listing. */
router.get('/coches', function(req, res, next) {
  res.render('/coches/add_coches');
});

module.exports = router;


