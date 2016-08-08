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

exports.getAll = function (req, res) {
    Competitor.find(function (err, competitors) {
        if (err) {
            res.send(err);
        }
        res.json({success:true, data:competitors});
    });
}

exports.getCompetitor = function (req, res) {
    Competitor.findOne({username: req.user.username}).exec(function(err, competitor){
        if(err) res.send({success: false, error: err});
        res.json({success: true, data: competitor});
    });
}