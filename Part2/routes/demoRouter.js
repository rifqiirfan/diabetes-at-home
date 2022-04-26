const express = require("express");
const controller = require("../controllers/patientController.js");

const clinicRouter = express.Router();


clinicRouter.get("/recordData", controller.renderRecordData);
clinicRouter.post("/recordData", controller.updateRecord);




module.exports = clinicRouter;
