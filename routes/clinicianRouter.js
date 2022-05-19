const express = require('express')
const passport = require("passport");
const utility = require("./clinicianUtility.js");
const controller = require('../controllers/clinicianController.js')

const clinicRouter = express.Router()

clinicRouter.get('/', utility.isLoggedIn, controller.getAllPatientData)
clinicRouter.get('/new_patient', utility.isLoggedIn, controller.newPatientCreation)
clinicRouter.get('/hist_rec/:id', utility.isLoggedIn, controller.viewHistRec)
clinicRouter.get('/view', utility.isLoggedIn, controller.viewCurComment)
clinicRouter.get('/new_cli_note/:id', utility.isLoggedIn, controller.newCliNoteCreation)
clinicRouter.get('/view_cli_note/:id', utility.isLoggedIn, controller.viewCliNote)


// change password part
clinicRouter.get(
  "/updatePwd",
  utility.isLoggedIn,
  controller.renderChangePwd
);
clinicRouter.post(
  "/updatePwd",
  utility.isLoggedIn,
  controller.updatePwd
);


//login
clinicRouter.get("/login", utility.unLoggedIn, controller.renderLogin);
clinicRouter.post(
  "/login",
  utility.unLoggedIn,
  passport.authenticate("clinician-login", {
    successRedirect: "/clinician",
    failureRedirect: "/clinician/login",
    failureflash: true,
  })
);
clinicRouter.get('/:id', utility.isLoggedIn, controller.renderRecordData)
clinicRouter.post("/logout", utility.isLoggedIn, controller.logout);
clinicRouter.post("/encrypt", controller.encrypt);
clinicRouter.post('/new_patient', utility.isLoggedIn, controller.postNewPatient)
clinicRouter.post('/:id', utility.isLoggedIn, controller.updateRecord)
clinicRouter.post('/:id/message', utility.isLoggedIn, controller.supportMessage)
clinicRouter.post('/new_cli_note/:id', utility.isLoggedIn, controller.postCliNote)
module.exports = clinicRouter