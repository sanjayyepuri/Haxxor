var Competitor = require('../models/competitor.model.js');
var User = require('../models/user.model.js');


exports.createCompetitor = function (req, res){
    var competitor = new Competitor({
        username: req.body.username,
        elo: req.body.elo,
        league: 'unranked',
        matches: [],
    });

    competitor.save(function (err) {
        if(err)
            res.send(err);
        var user = new User();
        
    })
}