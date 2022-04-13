const patientData = [
    {
        id: 1,
        patientId: 1,
        recordDate: "2022-04-11",
        data: {
            bgl: {
                fullName: "blood glocose level",
                status: "recorded",
                createdAt: new Date().toString(),
                value: 11,
                comment: "good",
            },
            weight: {
                fullName: "weight",
                status: "unrecorded",
                createdAt: new Date().toString(),
                value: 85,
                comment: "",

            },
            doit: {
                fullName: "doses of insulin take",
                status: "no need",
                createdAt: "",
                value: 0,
                comment: "",
            },
            exercise: {
                fullName: "exercise",
                status: "unrecorded",
                createdAt: "",
                value: 0,
                comment: "",
            },
        },
    },
];

module.exports = patientData;