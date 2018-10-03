var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    var user = req.session.user;

    if(user){
      res.render("dashboard", {user: user})
    }else{
      res.render("dashboard", {user: "user"})
    }
/*
  if(user){
    res.render("dashboard", {user: user})
  }else{
    res.render("error", {message: "La sesión ha expirado, por favor ingrese nuevamente"});
  }
*/
});

module.exports = router;
