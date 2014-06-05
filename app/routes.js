var Person = require('./models/Person');

module.exports = function(app){
	app.get('/people/listRecords', function(req, res){
	    console.log("Retrieve all entries");
    	Person.find(function(err, doc){
    		res.send(doc);
    	})
    });

    app.post('/insertRecord', function(req, res){
        console.log("Request to Insert New record in Database");

        res.header("Access-Control-Allow-Methods", "GET, POST");

        var receivedData = JSON.parse(req.body.userInfo);
        var person = new Person();
        person.firstName    =   receivedData.firstName;
        person.lastName     =   receivedData.lastName;
        person.email        =   receivedData.email;
        person.save(function(err, doc){
            if(err != undefined){
                res.send(err);
            }
            else{
                res.send(doc);
            }
        });
    });
}
