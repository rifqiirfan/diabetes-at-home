const express = require('express')
const controller = require('../controllers/clinicianController.js')

const clinicRouter = express.Router()

clinicRouter.get('/', controller.getAllPatientData)
clinicRouter.get('/:id', controller.renderRecordData)

module.exports = clinicRouter
