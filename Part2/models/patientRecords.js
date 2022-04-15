 const patientRecords= [
    {
        patientID: 1,
        dateHistory: [
        {
            actualDate: '2019-01-01',
            valueReceived:{
                    bgl: {
                        value: 8.0,
                        timeRecorded: "08:05",
                    },

                    weight:{
                            value:80,
                            timeRecorded:"08:10",
                    },
                    doit:{
                        value:2,
                        timeRecorded:"23:30",
                    },
                    exercise:{
                        value: 13451,
                        timeRecorded: "21:00",
                    }
            },

            commentText:{
                text: "Sample text from the patient 10001",
                timeRecorded: '',
            },
        },


        {
            actualDate: '2019-01-01',
            valueReceived:{
                    bgl: {
                        value: 8.0,
                        timeRecorded: "08:05",
                    },

                    weight:{
                            value:80,
                            timeRecorded:"08:10",
                    },
                    doit:{
                        value:2,
                        timeRecorded:"23:30",
                    },
                    exercise:{
                        value: 13451,
                        timeRecorded: "21:00",
                    }
            },

            commentText:{
                text: "Sample text from the patient 10001",
                timeRecorded: '',
            },
        },
    ]
    },
]
module.exports = patientRecords;