const express = require("express");
const controller = require("../controllers/patientController.js");

const clinicRouter = express.Router();


clinicRouter.get("/recordData", controller.renderRecordData);
// clinicRouter.post("/recordData", controller.updateRecord);
clinicRouter.get("/:id", controller.getDataById);
clinicRouter.post("/addPatient", controller.addOnePatient);


module.exports = clinicRouter;
