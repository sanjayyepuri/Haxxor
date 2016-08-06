var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CompetitorSchema = new Schema({
    username: {type:String, unique: true, dropdups: true, required: true},
    elo: {type: Number, required: true},
    status: {type: String, required: true},
    league: {type: String, required: true},
    matches: [{
        type: Schema.ObjectId,
        ref: 'Match'
    }]
});

mongoose.model('Competitor', CompetitorSchema);