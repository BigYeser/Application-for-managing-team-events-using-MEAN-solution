const mongoose = require('mongoose');



const Event = mongoose.model('Event',{
    userId: {
        type: String,
        required: false
    },
    eventTitle: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean
    }
})

module.exports = Event;