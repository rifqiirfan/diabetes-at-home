// link to model
const allPatientData = require('../models/patient')
const patientRecords = require('../models/record')


const getAllPatientData = async (req, res, next) => {
    try {
        const allPatients = await allPatientData.find().lean()
        return res.render('allData', { data: allPatients })
    } catch (err) {
        return next(err)
    }
}

// handle request to get one data instance
const getPatientDataById = async (req, res, next) => {
    try {
        // get data for a specific patient from patient schema (fname, lname...)
        const data = await allPatientData.findById(req.params.patient_id).lean()

        // get an array of recordID from patient schema
        const all_rec_id = data.records
        // initialize an empty array to store record data
        const all_rec =[]
        // loop through the recordID array in patient schema
        // use the recordID to retrieve record data from record schema
        // store the record data in all_rec[]
        for (var i = 0; i < all_rec_id.length; i++) {
            const one_rec = await patientRecords.findById(data.records[i].recordID).lean()
            all_rec.push(one_rec)
        }

        if (!data) {
            return res.sendStatus(404)
        }
        return res.render('oneData.hbs', { onePatient: data, record: all_rec })

    } catch (err) {
        return next(err)
    }
}

// add an object to the database
const insertData = (req, res) => {
    const { bgl, weight, doit, exercise } = req.body
    let patientId = req.params.id
    const record = patientRecords.find((r) => r.patientID == patientId)
    patientRecords.push()
    return res.redirect('back')
}


module.exports = {
    getAllPatientData,
    getPatientDataById,
    insertData
}
