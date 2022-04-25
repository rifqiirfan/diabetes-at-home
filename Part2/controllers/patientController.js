// link to model
const allPatientData = require('../models/patient')
const patientRecords = require('../models/record')


const getAllPatientData = async(req, res, next) => {
    try {
        const allPatients = await allPatientData.find().lean()
        return res.render('allData', { data: allPatients })
    } catch (err) {
        return next(err)
    }
}

// handle request to get one data instance
const getPatientDataById = async(req, res, next) => {
    try {
        // get data for a specific patient from patient schema (fname, lname...)
        const data = await allPatientData.findById(req.params.patient_id).lean()

        // get an array of recordID from patient schema
        const all_rec_id = data.records
            // initialize an empty array to store record data
        const all_rec = []
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
const insertData = async(req, res, next) => {
    try {
        // RECORD CREATION AND INSERTION:
        // capture input value
        const { bgl, weight, doit, exercise, comment } = req.body
            // create a record
        var new_rec = new patientRecords({
                "patientId": "1001",
                "recordDate": Date.now(),
                "bgl_fullName": "blood glocose level",
                "bgl_status": "recorded",
                "bgl_value": bgl,
                "bgl_createdAt": Date.now(),
                "weight_fullName": "weight",
                "weight_status": "recorded",
                "weight_value": weight,
                "weight_createdAt": Date.now(),
                "doit_fullName": "doses of insulin taken",
                "doit_status": "recorded",
                "doit_value": doit,
                "doit_createdAt": Date.now(),
                "ex_fullName": "exercise",
                "ex_status": "recorded",
                "ex_value": exercise,
                "ex_createdAt": Date.now(),
                "cmt_fullName": comment,
                "cmt_value": "I feel good"
            })
            // insert the new record to db
        await new_rec.save()

        // RECORD UPDATING FOR PATIENT:
        // // get the new record id
        // var new_rec_id = {recordID: new_rec._id}
        // // find the patient
        // const data = await allPatientData.findById(req.params.patient_id).lean()
        // // update the records array for patient
        // data.records.push(new_rec_id)

        return res.redirect('back')
    } catch (err) {
        return next(err)
    }

}

const entryPatientData = async(req, res, next) => {
    try {
        return res.render('entry.hbs')
    } catch (err) {
        return next(err)
    }
}


module.exports = {
    getAllPatientData,
    getPatientDataById,
    insertData,
    entryPatientData

}