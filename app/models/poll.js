var mongoose = require('mongoose');

module.exports = mongoose.model('Poll', {
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
