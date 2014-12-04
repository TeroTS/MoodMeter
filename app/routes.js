
var Poll = require('./models/poll');

module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // sample api route
 /*   app.get('/api/nerds', function(req, res) {
        // use mongoose to get all nerds in the database
        Nerd.find(function(err, nerds) {

            // if there is an error retrieving, send the error. 
                            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(nerds); // return all nerds in JSON format
        });
    });*/
        
    // route to handle creating goes here (app.post)
    app.post('/rest/polls', function(req, res) {

        Todo.create({
            title : req.body.otsikko,
            location : req.body.sijainti,
            description : req.body.kuvaus,
            creatorName : req.body.nimi,
            creatorEmail : req.body.sposti,
            dates : req.body.pvm,
            participantEmails : req.body.osallistujatSposti,
            participants : req.body.osallistujat,
            adminUrl : req.body.hallinnointiUrl,
            pollUrl : req.body.kyselyUrl
        }, function(err, todo) {
            if (err)
                res.send(err);
           }
        );
    });   
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};
