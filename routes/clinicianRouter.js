const express = require('express')
const controller = require('../controllers/clinicianController.js')

const clinicRouter = express.Router()

clinicRouter.get('/new_patient', controller.newPatientCreation)
clinicRouter.get('/hist_rec/:id', controller.viewHistRec)
clinicRouter.get('/', controller.getAllPatientData)
clinicRouter.get('/:id', controller.renderRecordData)
clinicRouter.post('/new_patient', controller.postNewPatient)

module.exports = clinicRouter
