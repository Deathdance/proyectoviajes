//inicialización
var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI('{
    consumerKey: ''
    consumerSecret: ''
    callback:''
    });
//obteniendo token de petición
twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
    if(error){
        console.log("Error de autentificación" + error);
    }else{
        
    }
});
//obteniendo token de acceso
twitter.getAccessToken(requestToken, requestTokenSecret, oauth_verifier, 
    function(error, accessToken, accessTokenSecret, results){
        if(error){
            console.log(error);
        }else{
            
        }
    });
//posteando en twitter
twitter.statuses("update", {
    status: "Hola mundo via Twitter #node-api"
},
accessToken,
accessTokenSecret,
function(error, data, response) {
    if(error){
        
    }else{
        
    }
});
