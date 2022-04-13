const express = require('express')

// create our Router object
const patientRouter = express.Router()

// require our controller
const patientController = require('../controllers/patientController')


/////////////////////////
// Entry
/////////////////////////

// entry page
patientRouter.get('/entry', patientController.getEntryData)












// add a route to handle the GET request for all demo data
patientRouter.get('/', patientController.getAllPatientData)

// add a route to handle the GET request for one data instance
patientRouter.get('/:id', patientController.getDataById)

// add a new JSON object to the database
patientRouter.post('/', patientController.insertData)







// export the router
module.exports = patientRouter