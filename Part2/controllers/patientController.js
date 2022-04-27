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

// get info for one patient
const getPatientDataById = async (req, res, next) => {
    try {
        // get data for a specific patient from patient schema (fname, lname...)
        const data = await allPatientData.findById(req.params.patient_id).lean()
        if (!data) return res.sendStatus(404)
        return res.render('oneData.hbs', { onePatient: data })
    } catch (err) {
        return next(err)
    }
}

// add an object to the database
const insertData = async (req, res, next) => {
    try {
        // RECORD CREATION AND INSERTION:
        // capture input value
        const { bgl, weight, doit, exercise, 
            bgl_comment, weight_comment, doit_comment, ex_comment} = req.body
        // create a record
        var new_rec = new patientRecords({
            "patientID": {
                "$oid": "62690854f78cd27a90116870"
            },
            "recordDate": Date.now(),
            "data": {
                "bgl": {
                    "fullName": "blood glocose level",
                    "status": "recorded",
                    "value": bgl,
                    "comment": bgl_comment,
                    "createdAt": Date.now()
                },
                "weight": {
                    "fullName": "weight",
                    "status": "recorded",
                    "value": weight,
                    "comment": weight_comment,
                    "createdAt": Date.now()
                },
                "doit": {
                    "fullName": "doses of insulin taken",
                    "status": "recorded",
                    "value": doit,
                    "comment": doit_comment,
                    "createdAt": Date.now()
                },
                "exercise": {
                    "fullName": "exercise",
                    "status": "recorded",
                    "value": exercise,
                    "comment": ex_comment,
                    "createdAt": Date.now()
                }
            }
        })
        // insert the new record to db
        await new_rec.save()

        // RECORD UPDATING FOR PATIENT:
        // get the new record id
        var new_rec_id = { recordID: new_rec._id }
        allPatientData.findById(req.params.patient_id)
        console.log("patient id: " + req.params.patient_id)


        // // find the patient
        // const data = await allPatientData.findById(req.params.patient_id).lean()
        // // update the records array for patient
        // data.records.push(new_rec_id)

        return res.redirect('back')
    } catch (err) {
        return next(err)
    }

}


// entry data page
const entryPatientData = async (req, res, next) => {
    try {
        return res.render('entry.hbs')
    } catch (err) {
        return next(err)
    }
}


// view history data page
const viewPatientData = async (req, res, next) => {
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
            const one_rec = await patientRecords.findById(data.records[i]).lean()
            all_rec.push(one_rec)
        }

        if (!data) {
            return res.sendStatus(404)
        }
        return res.render('view.hbs', { onePatient: data, record: all_rec })

    } catch (err) {
        return next(err)
    }
}


module.exports = {
    getAllPatientData,
    getPatientDataById,
    insertData,
    entryPatientData,
    viewPatientData
}