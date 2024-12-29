const express = require("express");
require("dotenv").config();
const db = require("../models/index");
const routeHandler = require("./routes/index");
const path = require("path");

const app = express();

app.use("/public", express.static(path.resolve(__dirname, "..", "public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api", routeHandler);

app.listen(PORT, () => {
  db.sequelize
    .authenticate()
    .then(() => console.log("database connected successfully"))
    .catch((err) => console.log(err));
  console.log("Server is running on port:", 5000);
});
