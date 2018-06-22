require("dotenv").config();
const express = require("express");
const app = express();

app.all("/", (req, res) => res.send("Liga Indo API"));
app.use('/clubs', require("./controllers/ClubController.js"));

app.listen(process.env.port || 3000);