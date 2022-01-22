const mongoose = require('mongoose');



const User = mongoose.model('User',{
    id:{
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    teamId: {
        type: String,
        required: true
    },
    events:[
        {
            event:{
                type: Object,
                required: true
            },
        }
    ],
    tokens:[
        {
            token:{
                type: String,
                required: true
            },
        }
    ]
})

module.exports = User;