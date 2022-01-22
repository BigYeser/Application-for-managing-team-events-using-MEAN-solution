const express = require('express')
const router = express.Router()
const CalendarEvent = require('../models/eventModel');





router.post('/events', (req, res) => {
    console.log(req.body)
    const event = new CalendarEvent(req.body)

    event.save().then(event => {
        res.status(201).send(event)
    }).catch(err => {
        console.log(err)
        res.status(400).send(err)
        
    })

})


router.get('/events', (req, res) => {
    CalendarEvent.find({}).then(events => {

        res.status(200).send(events)

    }).catch(err => {
        res.status(500).send('error: ' + err)
    })

})

router.get('/event/:id', (req, res) => {
    const _id = req.params.id;
    CalendarEvent.findById(_id).then(event => {
        if (!event) {
            return res.status(404).send()
        }
        res.status(200).send('event: ' + event)
    }).catch(err => {
        res.status(500).send('event not found')
    })

})

router.delete('/events', (req, res) => {

    CalendarEvent.deleteMany({})
        .then((result) => {
            res.status(200).send(result)
        }).catch((error) => {
            res.status(500).send(error)
        })
})

router.delete('/event/:id', (req, res) => {
    const _id = req.params.id;
    CalendarEvent.findOneAndDelete({_id}).then((event) => {
        if (!event) {
            return res.status(404).send('No Event found!')
        }
        res.status(200).send(event)
    }).catch((error) => {
        res.status(500).send(error)
    })
})


/* Update by ID */
router.put('/event/:id', (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'eventTitle', 'startDate', 'endDate', 'isPublic']
    const isValidUpdates = updates.every((update) =>
        allowedUpdates.includes(update)
    )
    if (!isValidUpdates) {
        res.status(400).send('Changes not valid!')
    }
    else {
        const _id = req.params.id;
        CalendarEvent.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
            .then((event) => {
                if (!event) {
                    res.status(404).send('No event to update')
                }
                res.status(200).send(event)
            }).catch((error) => {
                res.status(400).send(error.message)
            })
    }

})




module.exports = router