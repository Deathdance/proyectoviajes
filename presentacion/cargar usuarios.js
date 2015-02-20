//coge request llamada gUser que es un get
	app.get('/gUser', function(req, res){
		//hace la query y la guarda en una variable
		var adminUser = connection.query("SELECT * FROM user", function (error, result){
			var data = [];	//variable que guarda los datos que queremos de la select
				for (var i in result){
					//username es un campo de la BD, por username que haya en la select la añade a la variable declarada arriba mediante el método push
					data.push(result[i].username);
					
				}
			//se crea otra variable que contiene el JSON de la forma supplies : array de usernames	
			var mySupplies = {supplies : data};
			//redirecciona (renderiza/muestra) la pagina admin.ejs pasandole mySupplies. Los datos que contiene esta variable se introducen en el 'supplies' del admin.ejs
			res.render('admin.ejs', mySupplies);
				
		});
	});
