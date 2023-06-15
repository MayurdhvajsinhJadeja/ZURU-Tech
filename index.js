const express = require("express");
const app = express();
const db = require("./models");
const routes = require("./routes");
const http = require("http");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/", routes);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("SERVER RUNNING ON PORT 3001");
  });
});
