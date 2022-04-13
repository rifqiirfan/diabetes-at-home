// link to model
const data = require('../models/patientData.js');
const detail = require('../models/patientDetail.js');



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
  console.log("-- record info when display -- ", record);
  res.render("recordData.hbs", { records: record });
};

module.exports = {
    addOnePatient,
    getDataById,
    renderRecordData,
}