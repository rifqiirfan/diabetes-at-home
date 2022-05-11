// link to model
const Patient = require('../models/patient.js')
const Record = require('../models/record.js')

const getAllPatientData = async(req, res, next) => {
    try {
        const allPatients = await Patient.find().lean()

        const a = []
        var sample = {};
        for (i = 0; i < allPatients.length; i++) {
            const rec_now = await Record.findOne({
                patientID: allPatients[i]._id,
                recordDate: formatDate(new Date()),
            })
            if (!rec_now) {
                sample = {
                    name: allPatients[i].firstName + " " + allPatients[i].lastName,
                    id: allPatients[i]._id,
                    bgl: 0,
                    weight: 0,
                    doit: 0,
                    exercise: 0,
                    bgl_min: allPatients[i].data.bgl.minValue,
                    bgl_max: allPatients[i].data.bgl.maxValue,
                    weight_min: allPatients[i].data.weight.minValue,
                    weight_max: allPatients[i].data.weight.maxValue,
                    doit_min: allPatients[i].data.doit.minValue,
                    doit_max: allPatients[i].data.doit.maxValue,
                    exer_min: allPatients[i].data.exercise.minValue,
                    exer_max: allPatients[i].data.exercise.maxValue,

                }
            } else {
                sample = {
                    name: allPatients[i].firstName + " " + allPatients[i].lastName,
                    id: allPatients[i]._id,
                    bgl: rec_now.data.bgl.value,
                    weight: rec_now.data.weight.value,
                    doit: rec_now.data.doit.value,
                    exercise: rec_now.data.exercise.value,
                    bgl_min: allPatients[i].data.bgl.minValue,
                    bgl_max: allPatients[i].data.bgl.maxValue,
                    weight_min: allPatients[i].data.weight.minValue,
                    weight_max: allPatients[i].data.weight.maxValue,
                    doit_min: allPatients[i].data.doit.minValue,
                    doit_max: allPatients[i].data.doit.maxValue,
                    exer_min: allPatients[i].data.exercise.minValue,
                    exer_max: allPatients[i].data.exercise.maxValue,

                }
            }
            a.push(sample)
        }
        return res.render('dashboard.hbs', {
            data: a,
            date: formatDate(new Date()),
        })
    } catch (err) {
        return next(err)
    }
}

async function findPatient(pid) {
    try {
        // find all document in Patient Collection to findout if it is empty
        const result = await Patient.find()
        if (result.length == 0) {
            const newPatient = new Patient({
                firstName: 'Alice',
                lastName: 'Wang',
                screenName: 'AW',
                email: 'AW@gmail.com',
                password: '12345678',
                yearOfBirth: '1999',
                textBio: "I'm good",
                supportMessage: 'go for it!',
            })

            // save new patient Pat to database
            const patient = await newPatient.save()

            return patient.id
        } else {
            // find our target patient Pat
            // const patient = await Patient.findOne({_id: pid});
            const patient = await Patient.findById(pid)
            return patient.id
        }
    } catch (err) {
        console.log('error happens in patient initialisation: ', err)
    }
}

async function findRecord(patientId) {
    try {
        const result = await Record.findOne({
            patientID: patientId,
            recordDate: formatDate(new Date()),
        })
        if (!result) {
            const newRecord = new Record({
                patientID: patientId,
                recordDate: formatDate(new Date()),
            })

            const record = await newRecord.save()
            return record.id
        } else {
            return result.id
        }
    } catch (err) {
        console.log('error happens in record initialisation: ', err)
    }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [day, month, year].join('/')
}

const renderRecordData = async(req, res) => {
    try {
        const patientId = await findPatient(req.params.id)
        const patientData = await Patient.findById(patientId).lean()
        const recordId = await findRecord(patientId)
        const record = await Record.findOne({ _id: recordId })
            .populate({
                path: 'patientID',
                options: { lean: true },
            })
            .lean()
            // console.log(record);

        res.render('recordData.hbs', { records: record, personal: patientData })
    } catch (e) {
        res.status(400)
        res.send('error happens when render record data')
    }
}

const updateRecord = async(req, res) => {
    console.log('-- req form to update record -- ', req.body)
    try {
        const patientId = await findPatient(req.params.id)
            // const recordId = await findRecord(patientId)
        const record = await Patient.findById(patientId)
            // const record = await Record.findOne({ _id :recordId });

        const data = record.data[req.body.key]
        data.availability = req.body.availability
        data.maxValue = req.body.maxvalue
        data.minValue = req.body.minvalue
        data.minTime = req.body.mintime
        data.maxTime = req.body.maxtime
        data.status = 'recorded'

        record.save()
        res.redirect('back')
    } catch (err) {
        console.log('error happens in update record: ', err)
    }
}


// new patient creation page
const newPatientCreation = async(req, res, next) => {
    try {
        return res.render('newPatient.hbs');
    } catch (err) {
        return next(err)
    }
}


// add a new patient to the database
const postNewPatient = async(req, res, next) => {
    try {
        // PATIENT CREATION AND INSERTION:
        // capture input value
        const {
            firstName,
            lastName,
            email,
            yearOfBirth
        } = req.body

        const new_pati = new Patient({
            firstName: firstName,
            lastName: lastName,
            email: email,
            // generate a random password
            password: (Math.random() + 1).toString(36).substring(4),
            yearOfBirth: yearOfBirth,
            message: "Here's my text bio.",
            // generate a random screen name
            screenName: (Math.random() + 1).toString(36).substring(4)
        })

        // insert the new patient to db
        await new_pati.save()

        return res.redirect('./')
    } catch (err) {
        return next(err)
    }
}

const viewCurComment = async(req, res, next) => {
    try {
        const data = await Record.find().lean()

        return res.render('viewComment.hbs', { record: data })
    } catch (err) {
        return next(err)
    }
}



// view history data page
const viewHistRec = async(req, res, next) => {
    try {
        // get data for a specific patient from patient schema (fname, lname...)
        const curr_pati = await Patient.findById(req.params.id).lean()
        if (!curr_pati) return res.sendStatus(404)

        // get an array of recordID from patient schema
        const all_rec_id = curr_pati.records

        // initialize an empty array to store record data
        const all_rec = []
            // loop through the recordID array in patient schema
            // use the recordID to retrieve record data from record schema
            // store the record data in all_rec[]
        for (var i = 0; i < all_rec_id.length; i++) {
            const one_rec = await Record
                .findById(curr_pati.records[i].recordID)
                .lean()

            all_rec.push(one_rec)
        }
        const data = await Record.find().lean()

        const rec = []
        for (var i = 0; i < data.length; i++) {
            const one_rec = data[i]
                // console.log(one_rec)
            rec.push(one_rec)
        }
        console.log(rec[0])
        return res.render('cliViewHistory.hbs', { onePatient: curr_pati, record: all_rec })
    } catch (err) {
        return next(err)
    }
}

//
const supportMessage = async(req, res, next) => {
    try {
        const message = req.body()
        patient.message.update({ message: message })
        patient.save()
        res.redirect('back');
    } catch (err) {
        return next(err)
    }
}


module.exports = {
    getAllPatientData,
    renderRecordData,
    updateRecord,
    newPatientCreation,
    postNewPatient,
    viewHistRec,
    viewCurComment,
    supportMessage
}