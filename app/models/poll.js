var mongoose = require('mongoose');

var Poll = mongoose.model('Poll', {
    title: String,
    location: String,
    description: String,
    creatorName: String,
    creatorEmail: String,
    dates: [{type: Date}],
    participantEmails: [{type: String}],
    participants: [{type: String}],
    adminUrl: String,
    pollUrl: String
});

var Comment = mongoose.model('Comment', {
   _poll : {type: Number, ref: 'Poll'},
   name : String,
   text : String
});

module.exports = Poll;
//module.exports = Comment;