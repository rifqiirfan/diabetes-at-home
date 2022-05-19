const mongoose = require("mongoose");

const clinicianSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "clinician" },

  patients: [{
    patientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    clinicalNotes: [{
      createdAt: { type: String, default: null },
      createdBy: { type: String, required: true, trim: true },
      subjectiveData: { type: String, required: true, trim: true },
      objectiveData: { type: String, required: true, trim: true },
      assessmentData: { type: String, required: true, trim: true },
      plan: { type: String, required: true, trim: true },
      additionalNotes: { type: String, trim: true }
    }],
  }],
});
const Clinician = mongoose.model("Clinician", clinicianSchema);
module.exports = Clinician;
