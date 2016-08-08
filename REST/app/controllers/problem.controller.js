var Problem = require('../models/problem.model');

exports.createProblem = function (req, res){
    var problem = new problem({
        problemStatement: req.body.problemStatement,
        input: req.body.input,
        output: req.body.output,
    });

    problem.save(function (err) {
        if(err)
            res.send(err);
        res.json({
            success: true,
            message: 'Problem successfully created'
        });
    });
}

exports.getAll = function (req, res) {
    Problem.findOne({_id: req.params.problemID}).exec(function(err, problem){
        if(err) res.send({success: false, error: err});
        res.json({success: true, data: problem});
    });
}