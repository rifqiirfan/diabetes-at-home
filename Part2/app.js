const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
// require('dotenv').config()
const port = process.env.PORT || 5000;

//connect to database
require('./models/db.js');


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// hbs template engine
app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: "hbs",
    helpers: require("./public/js/helpers.js").helpers,
  })
);

// root
app.get("/", (req, res) => {
  // res.send("you can choose to go to patient page or clinician page");
  // res.sendFile(__dirname + "/static/index.html");
  res.render("index.hbs");
});

// middleware
const ClinicianRouter = require("./routes/demoRouter.js");

app.use("/clinician", ClinicianRouter);

app.listen(port, () =>
  console.log("> Server is up and running on http://localhost:" + port)
);
