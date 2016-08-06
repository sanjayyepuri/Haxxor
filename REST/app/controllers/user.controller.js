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

exports.getAll = function (req, res) {
    User.find(function (err, users){
        if (err) res.send({success: false, error: err});
        res.json({success: true, data:users });
    });
}

//TODO
exports.deleteUser = function(req, res){
    Competitor.remove({
        username: req.params.username
    });
}

exports.authenticate = function (req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user){
        if (err) throw err;
        if (!user) res.json({success:false, message:'Incorrect Username'});
        else if (user){
            if(!user.validPassword(req.body.password)) {
                res.json({success:false, message:'Incorrect Password'});
            }
            else if (user.validPassword(req.body.password)){
                var token = jwt.sign({ _id: user.competitor, level: user.level}, 'tokensecret', {
                    expiresIn: 86400
                });

                res.json({
                    success: true,
                    message: 'Logged in',
                    token: token
                })
            }
        }
    })
}