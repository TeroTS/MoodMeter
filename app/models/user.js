// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// schema for user model
var userSchema = mongoose.Schema({

    id			: String,
    token   	: String,
    email   	: String,
    name    	: String,
    role        : {type: String, enum: ['user', 'manager', 'admin']},
    managerName	: {type: String, default: ''},
    password    : String

});

// schema for user data model
var userDataSchema = mongoose.Schema({

	user		: String, //{type: String, ref: 'User'},
	timeStamp	: Date,
	value		: Number

});

// schema for admin model
/*var adminSchema = mongoose.Schema({

    email        : String,
    password     : String,
    role         : {type: String, default: 'admin'}

}); */

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users, admins and data and expose it to our app
module.exports = {
	user: 		mongoose.model('User', userSchema),
	userData:	mongoose.model('UserData', userDataSchema),
	//admin:		mongoose.model('Admin', adminSchema)
};
