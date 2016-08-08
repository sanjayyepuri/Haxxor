uservar mongoose  = require('mongoose'),
    Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    username: {type: String, unique: true, dropdups: true, required: true},
    password: {type: String, required: true},
    level: {type: Number, required: true},
    competitor:{
        type: Schema.ObjectId, 
        ref: 'Competitor',
        unique: true
    } 
})
UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model('User', UserSchema);
