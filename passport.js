const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const Patient = require("./models/patient.js");
const Clinician = require("./models/clinician.js");

module.exports = (passport) => {

    // following two functions are needed by passport to store user information in and retrieve user info from session
    passport.serializeUser((user, done) => {
        done(null, {_id: user._id, role: user.role})
    })
  
    passport.deserializeUser((login, done) => {
        if (login.role === "patient") {
            Patient.findById(login._id, (err, user) => {
            return done(err, user)
            })
        } 
        else if(login.role === "clinician"){
            Clinician.findById(login._id, (err, user) => {
            return done(err, user)
            })
        }
        else {
        return done("This user does not have role", null)
        }
    })

    passport.use(
        "patient-login", 
        new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
            passReqToCallback : true
        },
        (req, email, password, done) => {
            process.nextTick(() => {
                // Find the user associated with the email provided by the user
                
                Patient.findOne({'email': email.toLowerCase()}, async(err, patient) => {
                  if (err) {
                    return done(err);
                  } else if (!patient) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                  } else if (!await bcrypt.compare(password, patient.password)) {
                  // } else if (!(password == patient.password)) {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                  } else {
                    return done(null, patient, req.flash('loginMessage', 'Login successful'));
                  }
                });
            })
        })
      )

    passport.use(
      "clinician-login", 
      new LocalStrategy({
          usernameField: "email",
          passwordField: "password",
          passReqToCallback : true
      },
      (req, email, password, done) => {
          process.nextTick(() => {
              // Find the user associated with the email provided by the user
              Clinician.findOne({'email': email.toLowerCase()}, async(err, clinician) => {
                if (err) {
                  return done(err);
                } else if (!clinician) {
                  return done(null, false, req.flash('loginMessage', 'No user found.'));
                } else if (!await bcrypt.compare(password, clinician.password)) {
                // } else if (!(password == clinician.password)) {
                  return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                } else {
                  return done(null, clinician, req.flash('loginMessage', 'Login successful'));
                }
              });
          })
      })
    )
}