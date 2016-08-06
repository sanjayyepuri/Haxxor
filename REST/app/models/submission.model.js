var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SubmissionSchema = new Schema({
    match: {
        type: Schema.ObjectId,
        ref: 'Match'
    },
    round: {
        type: Schema.ObjectId,
        ref: 'Round'
    },
    competitor: {
        type: Schema.ObjectId,
        ref: 'Competitor'
    },
    file: {
        type: String
    }
});

mongoose.model('Submission', SubmissionSchema);