// link to model
const Patient = require("../models/patient.js");
const Record = require("../models/record.js");

const getAllPatientData = async (req, res, next) => {
  try {
      const allPatients = await Patient.find().lean();
      
      const a = [];
      for( i = 0; i < allPatients.length; i++ ){
        const rec_now = await Record.findOne({
          patientID: allPatients[i]._id,
          recordDate: formatDate(new Date()),
        });
        
        const sample = {name: allPatients[i].firstName + " " + allPatients[i].lastName , 
                      id : allPatients[i]._id,
                      bgl: rec_now.data.bgl.value ,
                      weight: rec_now.data.weight.value, 
                      doit: rec_now.data.doit.value,
                      exercise: rec_now.data.exercise.value, 
                      bgl_min: allPatients[i].data.bgl.minValue, bgl_max: allPatients[i].data.bgl.maxValue,
                      weight_min: allPatients[i].data.weight.minValue, weight_max: allPatients[i].data.weight.maxValue,
                      doit_min: allPatients[i].data.doit.minValue, doit_max: allPatients[i].data.doit.maxValue,
                      exer_min: allPatients[i].data.exercise.minValue, exer_max: allPatients[i].data.exercise.maxValue}
        a.push(sample);
        
      }
      return res.render('dashboard.hbs', { data: a , date: formatDate(new Date())});
  } catch (err) {
      return next(err);
  }
}

async function findPatient(pid) {
  try {
    // find all document in Patient Collection to findout if it is empty
    const result = await Patient.find();
    if (result.length == 0) {
      const newPatient = new Patient({
        firstName: "Alice",
        lastName: "Wang",
        screenName: "AW",
        email: "AW@gmail.com",
        password: "12345678",
        yearOfBirth: "1999",
        textBio: "I'm good",
        supportMessage: "go for it!",
      });

      // save new patient Pat to database
      const patient = await newPatient.save();

      return patient.id;
    } else {
      // find our target patient Pat
      // const patient = await Patient.findOne({_id: pid});
      const patient = await Patient.findById(pid);
      return patient.id;
    }
  } catch (err) {
    console.log("error happens in patient initialisation: ", err);
  }
}

async function findRecord(patientId) {
  try {
    const result = await Record.findOne({
      patientID: patientId,
      recordDate: formatDate(new Date()),
    });
    if (!result) {
      const newRecord = new Record({
        patientID: patientId,
        recordDate: formatDate(new Date()),
      });

      const record = await newRecord.save();
      return record.id;
    } else {
      return result.id;
    }
  } catch (err) {
    console.log("error happens in record initialisation: ", err);
  }
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
}




const renderRecordData = async (req, res) => {
  try{
    const patientId = await findPatient(req.params.id);
    const patientData = await Patient.findById(patientId).lean();
    const recordId = await findRecord(patientId);
    const record = await Record.findOne({ _id: recordId})
      .populate({
        path: "patientID",
        options: { lean : true},
      })
      .lean();
    // console.log(record);
    
    res.render("recordData.hbs", {records : record , personal : patientData});
  } catch(e){
    res.status(400);
    res.send("error happens when render record data");
  }
};

const updateRecord = async (req, res) => {
  console.log("-- req form to update record -- ", req.body);
  try {
    const patientId = await findPatient(req.params.id);
    const recordId = await findRecord(patientId);
    const record = await Record.findById( recordId )
    // const record = await Record.findOne({ _id :recordId });

    const data = record.data[req.body.key];
    data.value = req.body.value;
    data.maxValue = req.body.max;
    data.minValue = req.body.min;
    data.status = "recorded";
    data.createdAt = new Date().toLocaleString("en-Au", {
      timeZone: "Australia/Melbourne",
    });
    record.save();
    res.redirect("back");
  } catch (err) {
    console.log("error happens in update record: ", err);
  }
};

module.exports = {
    getAllPatientData,
    renderRecordData,
    updateRecord,
}