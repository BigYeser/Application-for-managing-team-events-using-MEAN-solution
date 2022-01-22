
const bcrypt = require('bcryptjs');
const express = require('express')
const router = express.Router()
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');



const tokenSecret = "my-token-secret";
const rounds = 10;

function generateToken(user) {
    return jwt.sign({ data: user }, tokenSecret, { expiresIn: '24' })
}



router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                res.status(404).json({ error: 'No User found with that username' });
            } else {
                bcrypt.compare(req.body.password, user.password, (err, match) => {
                    if (err) res.status(500).json(error)
                    else if (match) res.status(200).json({ token: generateToken(user.id) })
                    else res.status(403).json({ error: 'Invalid password' });
                })
            }
        })
        .catch(err => {
            res.status(500).json(error)
        })

});

router.post('/signup', (req, res) => {

    bcrypt.hash(req.body.password, rounds, function (err, hash) {

        if (err) res.status(500).json(err)

        else {
            const newUser = new User({
                 email: req.body.email,
                 username: req.body.username, 
                 team: req.body.team,
                 password: hash
                })

            newUser.save()
                .then(user => {
                    res.status(200).json({ token: generateToken(user) })
                })
                .catch(err => {
                    res.status(500).send("Username already exist")
                })

        }
    })
})

router.get('/users', (req, res) => {
    User.find({}).then(users => {
        usersNamesArray = new Array();
        users.forEach(user => {
            usersNamesArray.push(user.username)
        });
        res.status(200).send(usersNamesArray)
    }).catch(err => {
        res.status(500).send('error: ' + err)
    })

})

router.delete('/user/:id', (req, res) => {
    const _id = req.params.id;
    User.findOneAndDelete({_id}).then((user) => {
        if (!user) {
            return res.status(404).send('No User found!')
        }
        console.log(user.username)
        res.status(200).send(user.username)
    }).catch((error) => {
        res.status(500).send(error)
    })
})

// 
router.post('/user/:id', (req, res) =>{
    const _id = req.params.id;
    bcrypt.hash(req.body.password, rounds, function (err, hash) {

        if (err) res.status(500).json(err)
    
        else {
            User.findByIdAndUpdate({_id},{ password: hash }, {new: true})
                .then(user => {
                    res.status(200).json(user)
                })
                .catch(err => {
                    res.status(500).json(err)
                })
    
        }
    })
})



module.exports = router

