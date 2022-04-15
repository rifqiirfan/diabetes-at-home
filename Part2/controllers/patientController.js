// link to model
const allPatientData = require('../models/patientDetail')
const patientRecords = require('../models/patientRecords')

// handle request to get all data
const getAllPatientData = (req, res) => {
    res.render('allData.hbs', { data: allPatientData }) // send data to browser
}

// handle request to get one data instance
const getPatientDataById = (req, res) => {
    // search the database by ID
    const data = allPatientData.find(data => data.id === req.params.id)
    let patientId = 1;
    const record = patientRecords.find((r) => r.patientID == patientId)

    // return data if this ID exists
    if (data) {
        res.render('oneData.hbs', { onePatient: data, record: record })
    } else {
        res.sendStatus(404)
    }
}

// add an object to the database
const insertData = (req, res) => {
    const { bgl, weight, doit, exercise } = req.body
    let patientId = 1;
    const record = patientRecords.find((r) => r.patientID == patientId)
    patientRecords.push({
        patientID: 1,
        dateHistory: [
            {
                actualDate: '2019-01-01',
                valueReceived: {
                    bgl: {
                        value: 8.0,
                        timeRecorded: "08:05",
                    },

                    weight: {
                        value: 80,
                        timeRecorded: "08:10",
                    },
                    doit: {
                        value: 2,
                        timeRecorded: "23:30",
                    },
                    exercise: {
                        value: 13451,
                        timeRecorded: "21:00",
                    }
                },

                commentText: {
                    text: "Sample text from the patient 10001",
                    timeRecorded: '',
                },
            },
        ]
    },
    )
    return res.redirect('back')
}


module.exports = {
    getAllPatientData,
    getPatientDataById,
    insertData
}
