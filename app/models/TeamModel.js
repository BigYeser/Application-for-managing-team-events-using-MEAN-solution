const mongoose = require('mongoose');



const User = mongoose.model('Team',{
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
})

module.exports = Team;