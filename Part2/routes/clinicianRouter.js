const express = require("express");
const controller = require("../controllers/clinicianController.js");

const clinicRouter = express.Router();


clinicRouter.get("/recordData", controller.renderRecordData);
clinicRouter.post("/recordData", controller.updateRecord);




module.exports = clinicRouter;
