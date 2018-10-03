
const mongoose = require('mongoose');

mongoose.connect('mongodb://10.64.65.200:27017/regulacion', { useNewUrlParser: true });

var Schema = mongoose.Schema;

var db = mongoose.connection;

db.on('error', console.error.bind(console, '(X) - connection error: '));

db.once('open',function(){

  console.log("(!) - conection successful");

  //esquema de usuario
  var userSchema = new Schema({
    user: String,
    pass: String,
    active: {type: Boolean, default: 'true'}
  });
  
  //modelo de usuario
  userModel = mongoose.model('user', userSchema);

  //esquema de datos
  var dataSchema = new Schema({
    expediente: Number,
    establecimiento: {type: String, default: "Sin datos"},
    nombrefantasia: {type: String, default: "Sin datos"},
    domicilio: String,
    contacto: String,
    propiedad: String,
    dirtecnica: String,
    estado: String,
    observaciones: String
  });

  //modelo de datos
  dataModel = mongoose.model('data', dataSchema);

});

module.exports = db;