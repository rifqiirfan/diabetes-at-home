const express = require('express')

// create our Router object
const patientRouter = express.Router()

// require our controller
const patientController = require('../controllers/patientController')

// add a route to handle the GET request for all demo data
patientRouter.get('/', patientController.getAllPatientData)

patientRouter.get('/entry/:patient_id', patientController.entryPatientData)

patientRouter.get('/view/:patient_id', patientController.viewPatientData)

patientRouter.get('/:patient_id', patientController.getPatientDataById)

// add a new JSON object to the database
patientRouter.post('/', patientController.insertData)

// export the router
module.exports = patientRouter