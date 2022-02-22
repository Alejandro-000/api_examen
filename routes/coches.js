var express = require('express');
var router = express.Router();

const conexionBase = require('../conexionBase');
const connection = conexionBase();

/* GET PARA VER LA LISTA DE COCHES */
router.get('/cars', function(req, res, next) {
    const consulta = connection.query('SELECT * FROM coches', (err, result) => {
        // console.log('consulta: ',result);
        res.json({lista_de_coches: result});
    });
});
  
/* GET PARA REDIRIGIR A AÑADIR COCHES */
router.get('/add_car', function(req, res, next) {
    res.render('coches/add_coche');
});

/* POST PARA AÑADIR COCHES */
router.post('/add_car', function(req, res, next) {
    const { marca, modelo, potencia, url } = req.body;
    connection.query('INSERT INTO coches SET ?', {
        marca: marca,
        modelo: modelo,
        potencia: potencia,
        url_imagen: url
    }), (err, result) => {
        console.log(result);
        console.log(err);
    }
    console.log('Marca de coche:',marca,'con modelo:',modelo,'potencia:',potencia,'CCs')
    res.redirect('../cars');
});

/* GET PARA BORRAR COCHES */
router.get('/cars/borrar/:id', async(req, res, next) => {
    const { id } = req.params;
    console.log('id del coche a borrar ', id)
    await connection.query('DELETE FROM coches WHERE id = ?', [id], (err, result) =>{
        console.log(err);
        console.log(result);
    });
    res.redirect('/cars');
});

/* GET PARA CARGAR LOS DATOS DE UN COCHE YA EXISTENTE Y PODER MODIFICARLOS */
router.get('/cars/editar/:id', async(req, res, next) => {
    const { id } = req.params;
    await connection.query('SELECT * FROM coches WHERE id = ?', [id], (err, result) => {
      console.log('Errores', err);
      console.log('Consulta',result);
      res.render('coches/edit_coche', {producto: result[0]});
    });
});


module.exports = router;


