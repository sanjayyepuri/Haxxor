var User = require('../models/user.model');
var Competitor = require('../models/competitor.model');

exports.createUser = function (req, res){
    var competitor = new Competitor({
         username: req.body.username,
        elo: 1200,
        league: 'unranked',
        matches: []
    });
    competitor.save(function (err) {
        if(err)
            res.send(err);
        var user = new User({
            username: req.body.username,
            password: User.generateHash(req.body.password),
            level: 0,
            competitor: competitor._id
        });
        user.save(function (err){
            if(err)
                res.send(err);
            res.json({
                success: true, 
                message: 'User successfully created'
            });
            
        });
    });
    
    
}