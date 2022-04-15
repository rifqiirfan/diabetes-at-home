// link to model
const allPatientData = require('../models/patientDetail')

// handle request to get all data
const getAllPatientData = (req, res) => {
    res.render('allData.hbs', { data: allPatientData }) // send data to browser
}

// handle request to get one data instance
const getPatientDataById = (req, res) => {
    // search the database by ID
    const data = allPatientData.find(data => data.id === req.params.id)

    // return data if this ID exists
    if (data) {
        res.render('oneData.hbs', { oneItem: data })
    } else {
        res.sendStatus(404)
    }
}

// add an object to the database
const insertData = (req, res) => {
    const { id, firstName, lastName } = req.body
    allPatientData.push({ id, firstName, lastName })
    return res.redirect('back')
}


module.exports = {
    getAllPatientData,
    getPatientDataById,
    insertData
}
