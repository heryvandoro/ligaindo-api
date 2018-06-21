const router = require('express').Router();
const phantom = require("phantom");
const config = require("../config");

router.get("/", async (req, res) => {
    const instance = await phantom.create();
    const page = await instance.createPage();

    await page.open(config.BASE_ENDPOINT);
    const content = await page.property('content');
    console.log(content);

    await instance.exit();
    res.sendStatus(200);
});

module.exports = router;