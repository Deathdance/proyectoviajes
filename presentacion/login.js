function isEmptyObject(obj){
	return !Object.keys(obj).length;
}

app.post('/login', function(req, res) {
		
		sess = req.session;
		sess.username = req.body.username;
		sess.password = req.body.password;
		if((sess.username == 'admin') && (sess.password == 'admin')){
			var adminUser = connection.query("SELECT * FROM user", function (error, result){
				var data = [];
				for (var i in result){
					data.push(result[i].username);
					
				}
				
			var mySupplies = {supplies : data};
			res.render('admin.ejs', mySupplies);
				
			});
			
			

		}
		console.log('sess username ' + sess.username);
		console.log('sess pass ' + sess.password);
		var query = connection.query("SELECT * FROM user WHERE username = '"+ sess.username +"' and password = '"+ sess.password +"'", function (error, result){
            console.log(result);
            for(var i in result){
            	console.log(result[i].username);
            }
 			if (isEmptyObject(result)){
 				res.render('error.ejs');
 			}else{
 				res.render('info.ejs');
 			}
        
        });  
       
        
	});