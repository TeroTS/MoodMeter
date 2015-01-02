var mongoose = require('mongoose');

module.exports = mongoose.model('Comment', {
   _poll : {type: Number, ref: 'Poll'},
   name : String,
   text : String
});