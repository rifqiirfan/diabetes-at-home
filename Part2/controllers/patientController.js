// link to model
const patientData = require('../models/patientModel')

// handle request to get all data
const getAllPatientData = (req, res) => {
    res.render('allData.hbs', { data: patientData }) // send data to browser
}

// handle request to get one data instance
const getDataById = (req, res) => {
    // search the database by ID
    const data = patientData.find(data => data.id === req.params.id)

    // return data if this ID exists
    if (data) {
        res.render('oneData.hbs', { oneItem: data })
    } else {
        // You can decide what to do if the data is not found.
        // Currently, an empty list will be returned.
        res.send([])
    }
}

// add an object to the database
const insertData = (req, res) => {
    // push the incoming JSON object to the array. (Note, we are not validating the data - should fix this later.)
    patientData.push(req.body)
    // return the updated database
    res.send(patientData)
}




/////////////////////////
// Entry
/////////////////////////
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const button = jsdom.window.document.getElementById("submitButton");
let exercise = exercise.value;
let weight = weight.value;
console.log(exercise + " " + weight);

const getEntryData = (req, res) => {
    res.render('patientEntry.hbs')


}




module.exports = {
    getAllPatientData,
    getDataById,
    insertData,
    getEntryData
}


