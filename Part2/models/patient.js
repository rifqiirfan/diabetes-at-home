const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  screenName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  yearOfBirth: { type: String, required: true },
  textBio: { type: String, required: true },
  data: {
    bgl: {
      availability: { type: Boolean, default: true },
      minValue: { type: Number, default: 4 },
      maxValue: { type: Number, default: 7 }
    },
    weight: {
      availability: { type: Boolean, default: true },
      minValue: { type: Number, default: 55 },
      maxValue: { type: Number, default: 85 }
    },
    doit: {
      availability: { type: Boolean, default: true },
      minValue: { type: Number, default: 1},
      maxValue: { type: Number, default: 3 }
    },
    exercise: {
      availability: { type: Boolean, default: true },
      minValue: { type: Number, default: 3000 },
      maxValue: { type: Number, default: 7200 }
    }
  },
  records: [{
      recordID: { type: mongoose.Schema.Types.ObjectId, ref: "Record", required: true }
  }]
})

// create collection patients in mongodb
const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
