const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    screenName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    yearOfBirth: { type: Number, required: true },
    textBio: { type: String, required: true },
    records: {
        actualDate: { type: String, required: true }
    }
})
const Patient = mongoose.model('Patient', schema)
module.exports = Patient