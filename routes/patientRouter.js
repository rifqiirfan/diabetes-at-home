const express = require('express')

// create our Router object
const patientRouter = express.Router()

// require our controller
const patientController = require('../controllers/patientController')

// add a route to handle the GET request for all demo data

patientRouter.get('/', patientController.getAllPatientData)
patientRouter.get('/entry/:patient_id', patientController.entryPatientData)

patientRouter.get('/view/:patient_id', patientController.viewPatientData)
patientRouter.get('/leaderboard/:patient_id', patientController.showLeaderboard)

// add a route to handle the GET request for one data instance
patientRouter.get('/:patient_id', patientController.getPatientDataById)

// add a new JSON object to the database
patientRouter.post('/entry/:patient_id', patientController.updateRecord)
patientRouter.post('/:patient_id', patientController.resetPassword)

// export the router
module.exports = patientRouter