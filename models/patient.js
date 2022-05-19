const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    screenName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    secret: { type: String, required: true },
    yearOfBirth: { type: String, required: true },
    textBio: { type: String, required: true },
    supportMessage: { type: String, required: true },
    eRate: { type: Number, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    createAt: { type: String, required: true },
    clinician: { type: String, required: true },
    cid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clinician',
        required: true,
    },
    role: { type: String, default: "patient" },
    records: [{
        recordID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Record",
            required: true,
        },
    }],
});

// create collection patients in mongodb
const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;