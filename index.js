require("dotenv").config();
const express = require("express");
const app = express();

app.all("/", (req, res) => res.send("Liga Gojek Indo API"));
app.use('/clubs', require("./controllers/ClubController.js"));
app.use('/players', require("./controllers/PlayerController.js"));
app.use('/classements', require("./controllers/ClassementController.js"));

app.listen(process.env.port || 3000);