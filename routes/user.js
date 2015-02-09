//File: routes/user.js
module.exports = function(app) {
var usuario = require('../models/user.js');

//POST - Insertar usuario en DB
addUser = function(req, res) {
console.log('POST');
console.log(req.body);
var user = new usuario({
name: req.body.firstName,
surname: req.body.lastName,
username: req.body.username,
mail: req.body.email,
password: req.body.password,
genero: req.body.genre
});
user.save(function(err) {
if(!err) {
console.log('Created');
} else {
console.log('ERROR: ' + err);
}
});
res.send(user);
};

//Link routes and functions

app.post('/user', addUser);

}