var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProblemSchema = new Schema({
    problemStatement: {type: String},
    input: {type: String},
    output: {type: String}
});

mongoose.model('Problem', ProblemSchema)


    