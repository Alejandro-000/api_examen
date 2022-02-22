var express = require('express');
var router = express.Router();

const conexionBase = require('../conexionBase');
const connection = conexionBase();

/* GET para ver añadir coches */
router.get('/cars', function(req, res, next) {
    connection.query('SELECT * FROM productos', (err, result) => {
        console.log('consulta: ',result);
        res.render('lista_coches', {lista: result});
    });
});
  
router.get('/add_car', function(req, res, next) {
    res.render('coches/add_coche');
});

router.post('/add_car', function(req, res, next) {
    const { marca, modelo, potencia, url } = req.body;
    connection.query('INSERT INTO productos SET ?', {
        marca: marca,
        modelo: modelo,
        potencia: potencia,
        url: url
    }), (err, result) => {
        console.log(result);
        console.log(err);
    }
    console.log('Marca de coche:',marca,'con modelo:',modelo,'potencia:',potencia,'CCs')
    res.redirect('/cars');
});



module.exports = router;


