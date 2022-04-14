const patientData = [
    {
        id: 1,
        patientId: 1,
        recordDate: "2022-04-11",
        data: {
            bgl: {
                fullName: "Blood Glocose Level (in mmol/L)",
                status: "Recorded",
                createdAt: new Date().toString(),
                maximum:'7.0',
                minimum:'4.0',
                availbility: 'Yes',
                // comment: "good",
            },
            weight: {
                fullName: "Weight (in Kg)",
                status: "Unrecorded",
                createdAt: new Date().toString(),
                 maximum:'85',
                 minimum:'55',
                availbility: 'Yes',
                // comment: "",

            },
            doit: {
                fullName: "Doses of Insulin Taken",
                status: "no need",
                createdAt:new Date().toString(),
                maximum:'3',
                minimum:'1',
                availbility: 'Yes',          
                
            },
            exercise: {
                fullName: "Exercise (Step Count)",
                status: "unrecorded",
                createdAt:new Date().toString(),
                maximum: '7200',
                minimum:'3000',
                availbility: 'Yes',
                
            },
        },
    },
];

module.exports = patientData;
