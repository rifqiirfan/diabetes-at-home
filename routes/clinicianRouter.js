const express = require("express");
const passport = require("passport");
const utility = require("./clinicianUtility.js");
const controller = require("../controllers/clinicianController.js");
const req = require("express/lib/request");
const res = require("express/lib/response");

const clinicRouter = express.Router();

clinicRouter.get("/", utility.isLoggedIn, controller.getAllPatientData);
clinicRouter.get(
  "/new_patient",
  utility.isLoggedIn,
  controller.newPatientCreation
);
clinicRouter.get("/hist_rec/:id", utility.isLoggedIn, controller.viewHistRec);
clinicRouter.get("/view", utility.isLoggedIn, controller.viewCurComment);

// change password part
clinicRouter.get("/updatePwd", utility.isLoggedIn, controller.renderChangePwd);
clinicRouter.post("/updatePwd", utility.isLoggedIn, controller.updatePwd);

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

clinicRouter.get("/", function (req, res, next) {
  res.render("index", {
    title: "Form Validation",
    success: req.session.success,
    error: req.session.errors,
  });
  req.session.errors = null;
  req.session.success = null;
});

clinicRouter.post("/submit", function (req, res, next) {
  //check validation
  req.check("minValue", "Invalid value received").isNumber();

  var errors = req.validationErrors();
  if (errors) {
    req.session.errors = error.errors;
    req.session.success = false;
  } else {
    req.session.success = true;
  }
  res.redirect("/clinician");
});

clinicRouter.get("/:id", utility.isLoggedIn, controller.renderRecordData);
clinicRouter.post("/logout", utility.isLoggedIn, controller.logout);
clinicRouter.post("/encrypt", controller.encrypt);
clinicRouter.post(
  "/new_patient",
  utility.isLoggedIn,
  controller.postNewPatient
);
clinicRouter.post("/:id", utility.isLoggedIn, controller.updateRecord);
clinicRouter.post(
  "/:id/message",
  utility.isLoggedIn,
  controller.supportMessage
);
module.exports = clinicRouter;
