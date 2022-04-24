// link to model
const data = require('../models/patientData.js');
const detail = require('../models/patientDetail.js');
const datarecords = require('../models/patientRecords.js');


// handle request to get one data instance
const getDataById = (req, res) => {
    
    const data = detail.find(data => data.id === req.params.id)
    if (data) {
        res.send(detail);
    } else {
        res.send(["patient not found"]);
    }
}

const addOnePatient = (req, res) => {
    
    const newPatient = req.body;
    if (JSON.stringify(newPatient) != "{}") {
      
      if (!data.find((d) => d.id == newPatient.id)) {
        data.push(newPatient);
      }
    }
    res.send(data);
  };


const renderRecordData = (req, res) => {
  let patientId = 1;
  const record = data.find((r) => r.patientId == patientId);
  const values = datarecords.find((r) => r.patientID == patientId);
  console.log("-- record info when display -- ", record);
  res.render("recordData.hbs", { records: record , values : values });
};

const updateRecord = (req, res) => {
  console.log("-- req form to update record -- ", req.body);
  let patientId = 1;
  const record = data.find((r) => r.patientId == patientId);
  // console.log("-- record info when update -- ", record);
  const data = record.data[req.body.key];
  data.value = req.body.value;
  data.comment = req.body.comment;
  data.status = "recorded";
  data.createdAt = new Date().toString();
  res.redirect("/general/recordData");
};

module.exports = {
    addOnePatient,
    getDataById,
    renderRecordData,
    updateRecord,
}