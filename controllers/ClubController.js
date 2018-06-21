const router = require('express').Router();
const config = require("../config");

router.get("/", async (req, res) => {
    
    res.sendStatus(200);
});

module.exports = router;