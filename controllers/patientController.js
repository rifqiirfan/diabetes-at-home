// link to model
const allPatientData = require('../models/patient')
const patientRecords = require('../models/record')
let alert = require('alert')

async function findPatient(pid) {
    try {
        // find all document in Patient Collection to findout if it is empty
        const result = await allPatientData.find()
        if (result.length == 0) {
            const newPatient = new allPatientData({
                firstName: 'Alice',
                lastName: 'Wang',
                screenName: 'AW',
                email: 'AW@gmail.com',
                password: '12345678',
                yearOfBirth: '1999',
                textBio: "I'm good",
                eRate: 0,
                createAt: '05/09/2022',
                supportMessage: 'go for it!',
                clinician: 'Chris Andrew',
            })

            // save new patient Pat to database
            const patient = await newPatient.save()

            return patient.id
        } else {
            // find our target patient Pat
            // const patient = await Patient.findOne({_id: pid});
            const patient = await allPatientData.findById(pid)
            return patient.id
        }
    } catch (err) {
        console.log('error happens in patient initialisation: ', err)
    }
}

async function findRecord(patientId) {
    try {
        const result = await patientRecords.findOne({
            patientID: patientId,
            recordDate: formatDate(new Date()),
        })
        if (!result) {
            const newRecord = new patientRecords({
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

    return [month, day, year].join('/')
}

const getAllPatientData = async(req, res, next) => {
    try {
        const allPatients = await allPatientData.find().lean()
        return res.render('allData', { data: allPatients })
    } catch (err) {
        return next(err)
    }
}

// get info for one patient
const getPatientDataById = async(req, res, next) => {
    try {
        // get data for a specific patient from patient schema (fname, lname...)
        const data = await allPatientData.findById(req.params.patient_id).lean()
        console.log(data)
        if (!data) return res.sendStatus(404)
        return res.render('oneData.hbs', { onePatient: data })
    } catch (err) {
        return next(err)
    }
}

// add an object to the database
const insertData = async(req, res, next) => {
    try {
        // RECORD CREATION AND INSERTION:
        // capture input value
        const {
            bgl,
            weight,
            doit,
            exercise,
            bgl_comment,
            weight_comment,
            doit_comment,
            ex_comment,
        } = req.body
        const patient = await allPatientData.findById(req.params.patient_id)
        const checkRec = await patientRecords.findOne({
            patientID: patient.id,
            recordDate: formatDate(new Date()),
        })
        if (!checkRec) {
            const new_rec = new patientRecords({
                    patientID: patient.id,
                    recordDate: formatDate(new Date()),
                    data: {
                        bgl: {
                            fullName: 'blood glocose level',
                            status: 'recorded',
                            value: bgl,
                            comment: bgl_comment,
                            createdAt: new Date().toLocaleString('en-Au', {
                                timeZone: 'Australia/Melbourne',
                            }),
                        },
                        weight: {
                            fullName: 'weight',
                            status: 'recorded',
                            value: weight,
                            comment: weight_comment,
                            createdAt: new Date().toLocaleString('en-Au', {
                                timeZone: 'Australia/Melbourne',
                            }),
                        },
                        doit: {
                            fullName: 'doses of insulin taken',
                            status: 'recorded',
                            value: doit,
                            comment: doit_comment,
                            createdAt: new Date().toLocaleString('en-Au', {
                                timeZone: 'Australia/Melbourne',
                            }),
                        },
                        exercise: {
                            fullName: 'exercise',
                            status: 'recorded',
                            value: exercise,
                            comment: ex_comment,
                            createdAt: new Date().toLocaleString('en-Au', {
                                timeZone: 'Australia/Melbourne',
                            }),
                        },
                    },
                })
                // insert the new record to db
            await new_rec.save()

            // RECORD UPDATING FOR PATIENT:
            //console.log("patient id: " + req.params.patient_id)
            //console.log("new rec id: " + new_rec._id)
            allPatientData.findOne({ _id: req.params.patient_id },
                function(err, pati) {
                    if (!err) {
                        pati.records.push({ recordID: new_rec._id })
                        pati.save()
                    }
                }
            )

            return res.redirect('../')
        } else {
            return res.redirect('../')
        }
    } catch (err) {
        return next(err)
    }
}

const updateRecord = async(req, res) => {
    console.log('-- req form to update record -- ', req.body)
    try {
        const patientId = await findPatient(req.params.patient_id)
        const recordId = await findRecord(patientId)
        const record = await patientRecords.findById(recordId)
            // const record = await Record.findOne({ _id :recordId });

        const data = record.data[req.body.key]
        data.value = req.body.value

        data.status = 'recorded'
        data.createdAt = new Date().toLocaleString('en-Au', {
            timeZone: 'Australia/Melbourne',
        })
        data.comment = req.body.comment;
        await record.save()

        var bool = true;
        const patient = await allPatientData.findById(req.params.patient_id);
        for (i = 0; i < patient.records.length; i++) {
            if (patient.records[i].recordID == recordId) {
                bool = false;
            }
        }
        if (bool) {
            patient.records.push({ recordID: recordId })
            patient.save()
        }


        res.redirect('back');
    } catch (err) {
        console.log('error happens in update record: ', err)
    }
}

// entry data page
const entryPatientData = async(req, res, next) => {
    try {
        const data = await patientRecords.findOne({
            patientID: req.params.patient_id,
            recordDate: formatDate(new Date()),
        }).lean();
        if (!data) {
            const new_rec = new patientRecords({
                patientID: req.params.patient_id,
                recordDate: formatDate(new Date()),
            })
            new_rec.save()
                // res.render('entry.hbs', {record :  rec});
            const path = "/patient/entry/" + req.params.patient_id
            res.redirect(path)
        } else {
            const rec = data
            const pat = await allPatientData.findById(req.params.patient_id).lean()
            console.log(pat)
            return res.render('entry.hbs', { record: rec });
        }

    } catch (err) {
        return next(err)
    }
}

// view history data page
const viewPatientData = async(req, res, next) => {
    try {
        // get data for a specific patient from patient schema (fname, lname...)
        const data = await allPatientData.findById(req.params.patient_id).lean()
        if (!data) return res.sendStatus(404)

        // get an array of recordID from patient schema
        const all_rec_id = data.records

        // initialize an empty array to store record data
        const all_rec = []
            // loop through the recordID array in patient schema
            // use the recordID to retrieve record data from record schema
            // store the record data in all_rec[]
        for (var i = 0; i < all_rec_id.length; i++) {
            const one_rec = await patientRecords
                .findById(data.records[i].recordID)
                .lean()

            all_rec.push(one_rec)
        }

        return res.render('view.hbs', { onePatient: data, record: all_rec })
    } catch (err) {
        return next(err)
    }
}


// reset password
const resetPassword = async(req, res, next) => {
    try {
        const { new_pw } = req.body
            // find the patient
        allPatientData.findOne({ _id: req.params.patient_id },
            function(err, pati) {
                if (!err) {
                    // update new password
                    pati.password = new_pw
                    pati.save()
                }
            }
        )
        return res.redirect('./')
    } catch (err) {
        return next(err)
    }
}

//show the top5 leaderboard
async function calEngageRate(patient) {

    const startday = patient.createAt;
    const today = formatDate(new Date());
    date1 = new Date(startday);
    date2 = new Date(today);
    Diff_between = date2.getTime() - date1.getTime();
    totalDays = Diff_between / (1000 * 3600 * 24) + 1;
    Eday = patient.records.length;
    patient.eRate = (Eday / totalDays).toFixed(3);
    await patient.save();
    console.log("find data:", patient.firstName, patient.eRate);
}

const showLeaderboard = async(req, res) => {
    const patients = await allPatientData.find({}, {});
    for (patient of patients) {
        await calEngageRate(patient);
    }

    var patList = await allPatientData.find({}, {}).lean();
    patList = patList
        .sort((a, b) => {
            return b.eRate - a.eRate;
        })
        .slice(0, 5);
    res.render("leaderboard.hbs", { pats: patList });

}

module.exports = {
    getAllPatientData,
    getPatientDataById,
    insertData,
    updateRecord,
    entryPatientData,
    viewPatientData,
    resetPassword,
    showLeaderboard
}