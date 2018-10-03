var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    /*
    //para guardar
    var dataexample = {
        expediente: "123",
        establecimiento: "establecimiento",
        nombrefantasia: "nombre de fantasia",
        Domicilio: "domicilio",
        contacto: "contacto",
        propiedad: "propiedad",
        dirtecnica: "direccion tecnica",
        estado: "estado",
        observaciones: "observaciones"
      };

      var datatosave = new dataModel(dataexample);

      datatosave.save(function(e){
        console.log(e)
      })
      */
      /*
      //búsqueda de datos
      dataModel.find({}, function(e,d){
          console.log(e)
          console.log(d)
      });
    */
    res.send(true)
});

module.exports = router;
