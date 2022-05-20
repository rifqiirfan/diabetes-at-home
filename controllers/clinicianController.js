// link to model
const Patient = require('../models/patient.js')
const Record = require('../models/record.js')
const Clinician = require('../models/clinician.js')
const bcrypt = require("bcrypt")

const getAllPatientData = async (req, res, next) => {
    try {
        const clinicianId = req.user._id
        const allPatients = await Patient.find({ cid: clinicianId })
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
                    bgl_min: 4,
                    bgl_max: 7,
                    weight_min: 55,
                    weight_max: 85,
                    doit_min: 1,
                    doit_max: 3,
                    exer_min: 3000,
                    exer_max: 7200,

                }
            } else {
                sample = {
                    name: allPatients[i].firstName + " " + allPatients[i].lastName,
                    id: allPatients[i]._id,
                    bgl: rec_now.data.bgl.value,
                    weight: rec_now.data.weight.value,
                    doit: rec_now.data.doit.value,
                    exercise: rec_now.data.exercise.value,
                    bgl_min: rec_now.data.bgl.minValue,
                    bgl_max: rec_now.data.bgl.maxValue,
                    weight_min: rec_now.data.weight.minValue,
                    weight_max: rec_now.data.weight.maxValue,
                    doit_min: rec_now.data.doit.minValue,
                    doit_max: rec_now.data.doit.maxValue,
                    exer_min: rec_now.data.exercise.minValue,
                    exer_max: rec_now.data.exercise.maxValue,

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
                secret: 'secret',
                eRate: 0,
                createAt: '05/09/2022',
                age: 0,
                gender: 'unisex',
                yearOfBirth: '1999',
                textBio: "I'm good",
                supportMessage: 'go for it!',
                clinician: 'Chris Andrew',
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
            const pat = await Patient.findById(patientId).lean()
            const fullName = pat.firstName + pat.lastName
            
            const newRecord = new Record({
                patientID: patientId,
                patientName: fullName,
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

    return [month, day, year].join('/')
}

const renderRecordData = async (req, res) => {
    try {
        const patientId = await findPatient(req.params.id)
        const patient = await Patient.findById(patientId).lean()
        const recordId = await findRecord(patientId)
        const record = await Record.findOne({ _id: recordId })
            .populate({
                path: 'patientID',
                options: { lean: true },
            })
            .lean()
        // console.log(record);

        res.render('recordData.hbs', { records: record, patient: patient })
    } catch (e) {
        res.status(400)
        res.send('error happens when render record data')
    }
}

const updateRecord = async (req, res) => {
    console.log('-- req form to update record -- ', req.body)
    try {
        const patientId = await findPatient(req.params.id)
        const recordId = await findRecord(patientId)

        const record = await Record.findOne({ _id: recordId });
        const data = record.data[req.body.key]
        data.availability = req.body.availability
        data.maxValue = req.body.maxvalue
        data.minValue = req.body.minvalue

        data.thresholdStatus = 'recorded'

        record.save()
        res.redirect('back')
    } catch (err) {
        console.log('error happens in update record: ', err)
    }
}


// new patient creation page
const newPatientCreation = async (req, res, next) => {
    try {
        return res.render('newPatient.hbs');
    } catch (err) {
        return next(err)
    }
}


// add a new patient to the database
const postNewPatient = async (req, res, next) => {
    try {
        // PATIENT CREATION AND INSERTION:
        // capture input value
        const {
            firstName,
            lastName,
            email,
            yearOfBirth,
            age,
            gender,
            clinician,
        } = req.body


        const cid = req.user._id
        const pwd = await bcrypt.hash('password', 10)
        const new_pati = new Patient({
            firstName: firstName,
            lastName: lastName,
            email: email,
            // generate a random password and secret
            password: pwd,
            secret: (Math.random() + 1).toString(36).substring(8),
            eRate: 0,
            createAt: formatDate(new Date()),
            age: age,
            gender: gender,
            yearOfBirth: yearOfBirth,
            clinician: clinician,
            cid: cid,
            textBio: "Here's my text bio.",
            supportMessage: "Here's the support message.",
            // generate a random screen name
            screenName: (Math.random() + 1).toString(36).substring(4)
        })

        // insert the new patient to db
        await new_pati.save()

        var bool = true;
        const doctor = await Clinician.findById(cid);
        for (i = 0; i < doctor.patients.length; i++) {
            if (doctor.patients[i].patientID == new_pati._id) {
                bool = false;
            }
        }
        if (bool) {
            doctor.patients.push({ patientID: new_pati._id })
            doctor.save()
        }
        return res.redirect('./')
    } catch (err) {
        return next(err)
    }
}

const viewCurComment = async (req, res, next) => {
    try {
        const patient = await Patient.find({cid: req.user._id})
        var a = []
        for(i=0;i<patient.length;i++){
            const data = await Record.find({patientID: patient[i]._id}).lean()
            for(j=0; j<data.length;j++){                  
                a.push(data[j])
            }
        }
        console.log(a)
        return res.render('viewComment.hbs', { record: a })
    } catch (err) {
        return next(err)
    }
}



// view history data page
const viewHistRec = async (req, res, next) => {
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
        return res.render('cliViewHistory.hbs', { onePatient: curr_pati, record: all_rec })
    } catch (err) {
        return next(err)
    }
}


const supportMessage = async (req, res) => {
    console.log('-- req form to update support message -- ', req.body)
    try {
        // find the patient
        const patientId = await findPatient(req.params.id)
        const patient = await Patient.findById(patientId)
        patient.supportMessage = req.body.message
        patient.save()
        res.redirect('./')

    } catch (err) {
        return (err)
    }
    console.log('-- req form to update successfully')
}


// new clinician note creation page
const newCliNoteCreation = async (req, res, next) => {
    try {
        const data = await Patient.findById(req.params.id).lean()
        return res.render('enterClinicianNotes.hbs', { patientInfo: data });
    } catch (err) {
        return next(err)
    }
}

// add a new clinician note to the database
const postCliNote = async (req, res, next) => {
    try {
        // NOTE CREATION AND INSERTION:
        // capture input value
        const {
            subjectiveData,
            objectiveData,
            assessmentData,
            plan,
            additionalNotes,
            signature,
            date
        } = req.body

        // an object in the clinicalNotes array
        const new_note = {
            createdAt: date,
            createdBy: signature,
            subjectiveData: subjectiveData,
            objectiveData: objectiveData,
            assessmentData: assessmentData,
            plan: plan,
            additionalNotes: additionalNotes
        }

        // find the patient
        const cid = req.user._id
        const doctor = await Clinician.findById(cid)
        for (var i = 0; i < doctor.patients.length; i++) {
            if (doctor.patients[i].patientID == req.params.id) {
                // insert the new note to the array
                doctor.patients[i].clinicalNotes.push(new_note)
                doctor.save()
                break
            }
        }
        return res.redirect('../')

    } catch (err) {
        return next(err)
    }
}

// view the clinician note for one patient
const viewCliNote = async (req, res, next) => {
    try {
        data = null
        const cid = req.user._id
        const doctor = await Clinician.findById(cid).lean()
        for (var i = 0; i < doctor.patients.length; i++) {
            if (doctor.patients[i].patientID == req.params.id) {
                data = doctor.patients[i].clinicalNotes
            }
        }
        return res.render('viewClinicianNotes.hbs', { note: data })
    } catch (err) {
        return next(err)
    }
}

const renderLogin = (req, res) => {
    res.render("clinicianLogin.hbs", req.session.flash)
};

const logout = (req, res) => {
    req.logout()
    res.redirect("/clinician/login")
};

// reset password
const renderChangePwd = (req, res) => {
    res.render("changePwd.hbs")
};

const updatePwd = async (req, res) => {
    try {
        console.log("-- req form to update password -- ", req.body)
        const doctor = await Clinician.findById(req.user._id)
        if (req.body.newPwd.length < 8) {
            return res.render("changePwd", {
              message: "Password is less than 8 characters",
            })
          }
        if (!(req.body.newPwd == req.body.confirm)) {
            return res.render("changePwd", {
                message: "Please enter the new Password again!",
            })
        }
        if (req.body.oldPwd == req.body.newPwd) {
            return res.render("changePwd", {
                message: "New Password CAN NOT Be The Same with Previous one!",
            })
        }
        if (!(await bcrypt.compare(req.body.oldPwd, doctor.password))) {
            return res.render("changePwd", {
                message: "Please Enter the Correct Current Password!",
            })
        }


        doctor.password = await bcrypt.hash(req.body.confirm, 9)
        await doctor.save()
        res.render("changePwd", { message: "Successfully change password!" })
    } catch (err) {
        console.log(err)
        res.send("error happens on change password")
    }
};

const encrypt = async (req, res) => {
    try {
        const cid = req.user._id
        const doctor = await Clinician.findById(cid)
        doctor.password = await bcrypt.hash(doctor.password, 10)
        await doctor.save()
        res.redirect('/')

    } catch (err) {
        console.log(err)
        res.send("error")
    }
};

module.exports = {
    getAllPatientData,
    renderRecordData,
    updateRecord,
    newPatientCreation,
    postNewPatient,
    viewHistRec,
    viewCurComment,
    supportMessage,
    renderChangePwd,
    updatePwd,
    renderLogin,
    logout,
    encrypt,
    newCliNoteCreation,
    postCliNote,
    viewCliNote
}