const express = require('express');
const cors = require('cors');


const authRoute = require('../routes/loginAPI');
const eventsRoute = require('../routes/eventsAPI');
const db = require('../database/db');


const app = express();
app.use(express.json());
app.use(express.static("public"))

const port = process.env.port || 3000;
app.use(cors());
app.use('/api', authRoute);
app.use('/api', eventsRoute)


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// app.use((req, res, next) => {
//     res.set({
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "*",
//         "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
//     });

//     next();
// });






app.listen(port, () => {
    console.log('listening on port 3000')
})