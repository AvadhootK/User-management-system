const express = require("express");
//const exphbs = require('express-handlebars')
const path = require("path");
//const Handlebars = require('handlebars');
const cors = require("cors");
const db = require("./config/database");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

const app = express();
// environment variable PORT
const PORT = process.env.PORT || 8081;
// cross origin resource sharing
app.use(cors());

//const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

// Testing connection to database
db.authenticate()
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log(`Error ${err}`);
  });

// testing syncing of models
db.sync()
  .then(() => {
    console.log("Users Table created");
  })
  .catch((err) => console.log("Error: " + err));

// access to req.body
app.use(express.json());
// Body parser
app.use(express.urlencoded({ extended: true }));

// route user
app.use("/users", require("./routes/users"));

// Handlebars
// app.engine('handlebars',exphbs({
//     defaultLayout: 'main',
//     handlebars: allowInsecurePrototypeAccess(Handlebars)
// }))
// app.set('view engine','handlebars')

// home page route
app.get("/", (req, res) => {
  res.send({ message: "landing" });
});
