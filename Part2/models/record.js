const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  patientId: { type: String, ref: "Patient", required: true },
  recordDate: { type: Date, required: true },

  bgl_fullName: { type: String, default: "blood glocose level", immutable: true },
  bgl_status: { type: String, enum: ["recorded", "unrecorded", "no need"], default: "unrecorded" },
  bgl_value: { type: Number, default: 0 },
  bgl_createdAt: { type: Date, default: null },

  weight_fullName: { type: String, default: "weight", immutable: true },
  weight_status: { type: String, enum: ["recorded", "unrecorded", "no need"], default: "unrecorded" },
  weight_value: { type: Number, default: 0 },
  weight_createdAt: { type: Date, default: null },

  doit_fullName: { type: String, default: "doses of insulin taken", immutable: true },
  doit_status: { type: String, enum: ["recorded", "unrecorded", "no need"], default: "unrecorded" },
  doit_value: { type: Number, default: 0 },
  doit_createdAt: { type: Date, default: null },


  ex_fullName: { type: String, default: "exercise", immutable: true },
  ex_status: { type: String, enum: ["recorded", "unrecorded", "no need"], default: "unrecorded" },
  ex_value: { type: Number, default: 0 },
  ex_createdAt: { type: Date, default: null },

  cmt_fullName: { type: String, default: "comment", immutable: true },
  cmt_value: { type: String }
  // data: {
  //   bgl: {
  //     fullName: {type: String, default: "blood glocose level", immutable: true},
  //     status: {type: String, enum: ["recorded", "unrecorded", "no need"], default: "unrecorded"},
  //     value: {type: Number, default: 0},
  //     minValue: {type: Number, default: 0},
  //     maxValue: {type: Number, default: Number.MAX_VALUE},
  //     comment: {type: String, default: ""},
  //     createdAt: {type: String, default: null},
  //   }, 
  //   weight: {
  //     fullName: {type: String, default: "weight", immutable: true},
  //     status: {type: String, enum: ["recorded", "unrecorded", "no need"], default: "unrecorded"},
  //     value: {type: Number, default: 0},
  //     minValue: {type: Number, default: 0},
  //     maxValue: {type: Number, default: Number.MAX_VALUE},
  //     comment: {type: String, default: 0},
  //     createdAt: {type: String, default: null},
  //   }, 
  //   doit: {
  //     fullName: {type: String, default: "doses of insulin taken", immutable: true},
  //     status: {type: String, enum: ["recorded", "unrecorded", "no need"], default: "unrecorded"},
  //     value: {type: Number, default: 0},
  //     minValue: {type: Number, default: 0},
  //     maxValue: {type: Number, default: Number.MAX_VALUE},
  //     comment: {type: String, default: 0},
  //     createdAt: {type: String, default: null},
  //   }, 
  //   exercise: {
  //     fullName: {type: String, default: "exercise", immutable: true},
  //     status: {type: String, enum: ["recorded", "unrecorded", "no need"], default: "unrecorded"},
  //     value: {type: Number, default: 0},
  //     minValue: {type: Number, default: 0},
  //     maxValue: {type: Number, default: Number.MAX_VALUE},
  //     comment: {type: String, default: 0},
  //     createdAt: {type: String, default: null},
  //   },
  // }
});

// create collection records in mongodb
const Record = mongoose.model("Record", recordSchema);
module.exports = Record;
