var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RoundSchema = new Schema({
    problem: {
        type: Schema.ObjectId,
        ref: 'Problem'
    },
    winner: {
        type: Schema.ObjectId,
        ref: 'Competitor'
    },
    completed: {type: Boolean}
});

mongoose.model('Round', RoundSchema);