const mongoose = require('mongoose');
    
    mongoose.connect('mongodb://localhost:27017/vacationPlaner', err => {
    if (err) throw err;
    console.log('Connected to MongoDB!!!')
})