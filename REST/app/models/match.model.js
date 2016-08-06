var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MatchSchema = new Schema({
    opponents: [{
        type: Schema.ObjectId, 
        ref: 'Competitor'
    }],
    problems: [{
        type: Schema.ObjectId,
        ref: 'Problem'
    }],
    winner: {
        type: Schema.ObjectId,
        ref: 'Competitor'
    },
    loser: {
        type: Schema.ObjectId,
        ref: 'Competitor'
    },
    currentProblem: {type: Number}
});
mongoose.model('Match', MatchSchema)
