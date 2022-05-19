const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
    patientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    recordDate: { type: String, required: true },
    patientName: { type: String },
    data: {
        bgl: {
            availability: { type: Boolean, default: false },
            fullName: {
                type: String,
                default: 'blood glocose level',
                immutable: true,
            },
            status: {
                type: String,
                enum: ['recorded', 'unrecorded', 'no need'],
                default: 'unrecorded',
            },
            thresholdStatus:{
                type: String,
                enum: ['recorded', 'unrecorded', 'no need'],
                default: 'unrecorded',
            },
            minValue: { type: Number, default: 4 },
            maxValue: { type: Number, default: 7 },
            value: { type: Number, default: 0 },
            comment: { type: String, default: '' },
            createdAt: { type: String, default: null },
        },
        weight: {
            availability: { type: Boolean, default: false },
            fullName: { type: String, default: 'weight', immutable: true },
            status: {
                type: String,
                enum: ['recorded', 'unrecorded', 'no need'],
                default: 'unrecorded',
            },
            thresholdStatus:{
                type: String,
                enum: ['recorded', 'unrecorded', 'no need'],
                default: 'unrecorded',
            },
            minValue: { type: Number, default: 55 },
            maxValue: { type: Number, default: 85 },
            value: { type: Number, default: 0 },
            comment: { type: String, default: '' },
            createdAt: { type: String, default: null },
        },
        doit: {
            availability: { type: Boolean, default: false },
            fullName: {
                type: String,
                default: 'doses of insulin taken',
                immutable: true,
            },
            status: {
                type: String,
                enum: ['recorded', 'unrecorded', 'no need'],
                default: 'unrecorded',
            },
            thresholdStatus:{
                type: String,
                enum: ['recorded', 'unrecorded', 'no need'],
                default: 'unrecorded',
            },
            minValue: { type: Number, default: 1 },
            maxValue: { type: Number, default: 3 },
            value: { type: Number, default: 0 },
            comment: { type: String, default: '' },
            createdAt: { type: String, default: null },
        },
        exercise: {
            availability: { type: Boolean, default: false },
            fullName: { type: String, default: 'exercise', immutable: true },
            status: {
                type: String,
                enum: ['recorded', 'unrecorded', 'no need'],
                default: 'unrecorded',
            },
            thresholdStatus:{
                type: String,
                enum: ['recorded', 'unrecorded', 'no need'],
                default: 'unrecorded',
            },
            minValue: { type: Number, default: 3000 },
            maxValue: { type: Number, default: 7200 },    
            value: { type: Number, default: 0 },
            comment: { type: String, default: '' },
            createdAt: { type: String, default: null },
        },
    },
})

// create collection records in mongodb
const Record = mongoose.model('Record', recordSchema)
module.exports = Record
