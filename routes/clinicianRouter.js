const express = require('express')
const controller = require('../controllers/clinicianController.js')

const clinicRouter = express.Router()

clinicRouter.get('/new_patient', controller.newPatientCreation)
clinicRouter.get('/hist_rec/:id', controller.viewHistRec)
clinicRouter.get('/', controller.getAllPatientData)
clinicRouter.get('/:id', controller.renderRecordData)
clinicRouter.get('/viewComment/:id', controller.viewCurComment)
clinicRouter.post('/new_patient', controller.postNewPatient)
clinicRouter.post('/:id', controller.updateRecord)

module.exports = clinicRouter
