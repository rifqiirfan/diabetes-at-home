const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
const passport = require('passport');
const flash = require("express-flash");
const session = require("express-session");

//passport set
require('./passport')(passport);
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 900000}
}))
app.use(passport.initialize())
app.use(passport.session())

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
});
// simple page
app.get('/what-is-diabetes', (req, res) => {
    res.render('what-is-diabetes.hbs');
});
app.get('/about-us', (req, res) => {
    res.render('about-us.hbs')
});
// login
// app.get('/login', (req, res) => {
//     res.render('login.hbs')
// });

// link to our router
const ClinicianRouter = require('./routes/clinicianRouter.js')
const patientRouter = require('./routes/patientRouter')


// the demo routes are added to the end of the '/patient' path
app.use('/clinician', ClinicianRouter)
app.use('/patient', patientRouter)

app.listen(port, () => {
    console.log("> Server is up and running on http://localhost:" + port)
})

require('./models/index.js')
