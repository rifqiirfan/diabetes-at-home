const express = require('express')

// create our Router object
const patientRouter = express.Router()

// require our controller
const patientController = require('../controllers/patientController')

// add a route to handle the GET request for all demo data
patientRouter.get('/', patientController.getAllPatientData)

// add a route to handle entry patient data 
patientRouter.get('/entry', patientController.entryPatientData)

// add a route to handle entry patient data 
patientRouter.get('/view', patientController.viewPatientData)

// add a route to handle entry patient data 
patientRouter.get('/view/:patient_id', patientController.getPatientDataById)

// add a route to handle the GET request for one data instance
patientRouter.get('', patientController.getPatientDataById)




// add a new JSON object to the database
patientRouter.post('/', patientController.insertData)

// export the router
module.exports = patientRouter