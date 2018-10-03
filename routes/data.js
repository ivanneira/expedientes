var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    dataModel.find({},function(e,d){

        if(!e){

            if(d != ""){

                console.log(d);

                formatData(res,d);
            }

        }else{
            console.log("(X) - Error al acceder a la base de datos: " + e)
        }
    });

    
  //res.send(true);
});

router.post('/', function(req, res, next) {

    var data = req.body;
    console.log(data)

    dataModel.find({expediente: data.expediente},function(e,d){

        //console.log(d)

        if(!e){

            if(d != ""){

                res.send('exist')
            }else{
                var saveRegistro = new dataModel(data);

                saveRegistro.save(function(er,doc){

                    if(er){
                        console.log("(X) - Error: " + er);
                    }else{
                        res.send(true);                    
                    }

                  });
            }

        }else{
            console.log("(X) - Error al acceder a la base de datos: " + e)
            res.send(null);
        }
    });
});

function formatData(res,data){

    var data2send = {
        "data": []
    };

    for(var index in data){

        data2send.data.push({
            "expediente": data[index].expediente,
            "establecimiento": data[index].establecimiento,
            "nombrefantasia": data[index].nombrefantasia,
            "domicilio": data[index].domicilio,
            "contacto": data[index].contacto,
            "propiedad": data[index].propiedad,
            "dirtecnica": data[index].dirtecnica,
            "estado": data[index].estado,
            "observaciones": data[index].observaciones
        });
    }

    res.send(data2send);

}

module.exports = router;
