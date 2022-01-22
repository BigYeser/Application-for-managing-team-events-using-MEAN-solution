const express = require('express')
const router = express.Router()
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');


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