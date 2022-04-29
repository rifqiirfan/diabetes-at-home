const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000

// set Handlebars view engine
app.set('view engine', 'hbs')
app.use(express.static('public'))

// Set up to handle POST requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// hbs template engine
app.engine(
    'hbs',
    exphbs.engine({
        defaultLayout: 'main',
        extname: 'hbs',
        helpers: require('./public/js/helpers.js').helpers,
    })
)

// root
app.get('/', (req, res) => {
    res.render('index.hbs')
})

// link to our router
const ClinicianRouter = require('./routes/clinicianRouter.js')
const patientRouter = require('./routes/patientRouter')

// the demo routes are added to the end of the '/patient' path
app.use('/clinician', ClinicianRouter)
app.use('/patient', patientRouter)

app.listen(port, () =>
    console.log('> Server is up and running on http://localhost:' + port)
)
// app.listen(process.env.PORT || 3000, () => {
//   console.log('The library app is running!')
// })

require('./models/index.js')
