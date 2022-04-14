 const patientRecords= 
{
 patientID:
    { patientDigits: 10001,
        dateHistory: 
        {
            actualDate: '2019-01-01',
    valueReceived:
    {
        bgl: {
            value: 6.0,
            timeRecorded: "08:05",
        },

        weight:
        {
                value:80,
                timeRecorded:"08:10",
        },
        doit:
        {
            value:2,
            timeRecorded:"23:30",
        },
        exercise:
        {
            value: 13451,
            timeRecorded: "21:00",

        }
    },

    commentText:
    {
        text: "Sample text from the patient 10001",
        timeRecorded: '',
    },


},
},
}

module.exports = patientRecords;