const express = require('express')
const passport = require("passport");
const utility = require("./patientUtility.js");
// create our Router object
const patientRouter = express.Router()

// require our controller
const patientController = require('../controllers/patientController')

// add a route to handle the GET request for all demo data

patientRouter.get('/', utility.isLoggedIn, patientController.getAllPatientData)
patientRouter.get('/entry/:patient_id', utility.isLoggedIn, patientController.entryPatientData)

patientRouter.get('/view/:patient_id', utility.isLoggedIn, patientController.viewPatientData)
patientRouter.get('/leaderboard/:patient_id', utility.isLoggedIn,  patientController.showLeaderboard)

//login
patientRouter.get("/login", utility.unLoggedIn, patientController.renderLogin);
patientRouter.post(
  "/login",
  utility.unLoggedIn,
  passport.authenticate("patient-login", {
    successRedirect: "/patient",
    failureRedirect: "/patient/login",
    failureflash: true,
  })
);
patientRouter.post("/logout", utility.isLoggedIn, patientController.logout);

// add a route to handle the GET request for one data instance
patientRouter.get('/:patient_id', utility.isLoggedIn, patientController.getPatientDataById)

// add a new JSON object to the database
patientRouter.post('/entry/:patient_id', utility.isLoggedIn, patientController.updateRecord)
patientRouter.post('/:patient_id', utility.isLoggedIn, patientController.resetPassword)


// export the router
module.exports = patientRouter