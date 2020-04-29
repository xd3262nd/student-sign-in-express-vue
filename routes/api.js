let express = require('express')

// this will get wtvr index.js exports which is the db (module.exports line)
let db = require('../models')
let Student = db.Student
let Sequelize = require('sequelize')

//router matches requests to functions that can respond to them
let router = express.Router()

//GET request
//get a request from students, that will cause request, respond, and next function to run 
router.get('/students', function(req, res, next){
    //student object
    Student.findAll( { order: ['name'] }  ).then( students => {
        // response is the array of student
        return res.json(students)
    })
})

//create POST request
router.post('/students', function(req, res, next){
    // get the req.body (where the Vue client send request AKA req)
    Student.create( req.body ).then( data => {
        // need to create the Student
        //need to return something like a message about the action
        //and send the message
        return res.status(201).send('created!')
         
    } ).catch ( err => {
        if (err instanceof Sequelize.ValidationError){
            let messages = err.errors.map( e => e.message )
            //400 status = bad request from user
            return res.status(400).json(messages)
        }
        return next(err)
    })
})

router.patch('/students/:id', function(req, res, next){   
    // Update or Modify student
    Student.update(
        req.body, { 
            where: {
                id: req.params.id
            }
    }).then( rowsModified => {
        if (!rowsModified[0]) {
            return res.status(404).send('Not found')               
        } else {
            return res.send('ok')
        }
    }).catch( err => {
        if (err instanceof Sequelize.ValidationError) {
            let messages = err.errors.map( (e) => e.message)
            return res.status(400).json(messages)
        }
        return next(err)
    })
})


router.delete('/students/:id', function(req, res, next){ 
    Student.destroy({where: {id: req.params.id}}).then( rowsModified => {
        return res.send('ok')
    }).catch( err => next(err) )
})






//make the router available to the rest of the project
module.exports = router