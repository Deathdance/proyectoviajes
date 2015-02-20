
	//coge la request post /insertdiario
	app.post('/insertdiario', function(req, res){
		//console.log es para mostrar por consola así que no tiene importancia
		console.log(sess.username);
//hace la query Insert into en la tabla diario donde los campos titulo, texto, autor (que son los unicos campos que tiene) se le pasa el valor del title de la página, el texto y el username del usuario en sesión (sess.username) 
//la nomenclatura para mysql es poniendo los nombres de los campos, interrogantes (una por cada campo -si hubiera 5 campos, serían 5 '?') y luego en un array separado por comas el valor que va a tomar
		var query = connection.query('INSERT INTO diario(titulo, texto, autor) VALUES(?, ?, ?)', [req.body.title, req.body.texto, sess.username], function(error, result){
   		//si hay error redirecciona a error.js
			if(error){
				console.log(error);
				res.render('error.ejs');
   			}else{
			//todo bien-> redirecciona/renderiza/muestra la página con el mensaje de que el diario se ha insertado correctamente.
      			console.log(result);
      			//guardamos el username del usuario en sesión
				res.render('msgNewDiario.ejs');
   			}
 		});		
		
	});
