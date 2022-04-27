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
      minValue: { type: Number, default: 0 },
      maxValue: { type: Number, default: Number.MAX_VALUE }
    },
    weight: {
      availability: { type: Boolean, default: true },
      minValue: { type: Number, default: 0 },
      maxValue: { type: Number, default: Number.MAX_VALUE }
    },
    doit: {
      availability: { type: Boolean, default: true },
      minValue: { type: Number, default: 0 },
      maxValue: { type: Number, default: Number.MAX_VALUE }
    },
    exercise: {
      availability: { type: Boolean, default: true },
      minValue: { type: Number, default: 0 },
      maxValue: { type: Number, default: Number.MAX_VALUE }
    }
  },
  records: [{
      recordID: { type: mongoose.Schema.Types.ObjectId, ref: "Record", required: true }
  }]
})

// create collection patients in mongodb
const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
