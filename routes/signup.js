var express = require('express');
var router = express.Router();

/*
Datastore = require('nedb');
db = new Datastore({filename: 'DATA'});

db.loadDatabase(function(err){
    if(err) console.log(err);

  });
*/
/* GET home page. */
router.get('/', function(req, res, next) {

/*
    var usertosave = new userModel({user: 'up', pass: 'up'});

    usertosave.save(function(e){
      console.log(e)
    })
*/
    var user = req.query.user;
    var pass = req.query.pass;

    var message = {login: false, message: "", url: ""};

    userModel.findOne({user: user},function(e,d){
        console.log("ERROR: "+ e)
        console.log("DATO: " + d)


        if(!e){

            var loginData = d;

            //console.log(loginData)
    
            if(loginData && typeof(loginData) !== "undefined"){
    
                if(loginData.pass == pass && loginData.active){
    
                    req.session.user = loginData.user;
                    //console.log(req.session)
    
                    message.login = true;
                    message.url = "dashboard";
                }else{
                    message.login = false;
                    message.message = "La contraseña no es correcta o el usuario está deshabilitado"
                }
    
            }else{
                message.login = false;
                message.message = "No existe ese usuario"
            }
        }else{
            message.login = false;
            message.message = "hubo un problema al acceder a la base de datos, consulte a informática " + e;
        }



        res.send(message)
    });
/*
    db.find({user: user}).limit(1).exec(function(err,docs){
        
        var loginData = docs[0];

        //console.log(loginData)

        if(loginData !== [] && typeof(loginData) !== "undefined"){

            if(loginData.pass == pass && loginData.active){

                req.session.user = loginData.user;
                //console.log(req.session)

                message.login = true;
                message.url = "dashboard";
            }else{
                message.login = false;
                message.message = "La contraseña no es correcta o el usuario está deshabilitado"
            }

        }else{
            message.login = false;
            message.message = "No existe ese usuario"
        }

        res.send(message)
    });*/


});

module.exports = router;
