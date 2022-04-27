const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  screenName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  yearOfBirth: { type: String, required: true },
  textBio: { type: String, required: true },
  records: [{
      recordID: { type: mongoose.Schema.Types.ObjectId }
  }]
})

// create collection patients in mongodb
const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
