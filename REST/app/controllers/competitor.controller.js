var Competitor = require('../models/competitor.model');
var User = require('../models/user.model');


exports.createCompetitor = function (req, res){
    var competitor = new Competitor({
        username: req.body.username,
        elo: 1200,
        league: 'unranked',
        matches: [],
    });

    competitor.save(function (err) {
        if(err)
            res.send(err);
        res.json({
            success: true,
            message: 'Competitor successfully created'
        });
    });
}