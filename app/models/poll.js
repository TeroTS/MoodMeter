var mongoose = require('mongoose');

var Poll = mongoose.model('Poll', {
    title: String,
    location: String,
    description: String,
    creatorName: String,
    dates: [{type: Date}],
    participantEmails: String,
    participants: [{}],
    pollUrl: String
});

module.exports = Poll;