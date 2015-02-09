// models/User.js
 
module.exports = function(mongoose) {
 
  var Schema = mongoose.Schema;
 
  // Objeto modelo de Mongoose
  var UserSchema = new Schema({
 
    // Propiedad nombre
    name : String, // tipo de dato cadena de caracteres
    surname : String,
    // Propiedad email
    mail : String, 
    // Propiedad contraseña
    password : String,
    // Propiedad género
    genero : String, enum:['Hombre', 'Mujer', 'Otro']
 
  });
 
 
  module.exports = mongoose.model('users', UserSchema);
}