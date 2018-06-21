const router = require('express').Router();
const phantom = require("phantom");
const createPhantomPool = require("phantom-pool");
const config = require("../config");

const pool = createPhantomPool({
    max: 10,
    min: 2,
    idleTimeoutMillis: 30000,
    maxUses: 0,
    validator: () => Promise.resolve(true),
    testOnBorrow: true,
    phantomArgs: [['--ignore-ssl-errors=true', '--disk-cache=true'], {
        logLevel: 'debug',
    }]
});

router.get("/", async (req, res) => {
    let content = await pool.use(async (instance) => {
        const page = await instance.createPage();
        const status = await page.open(config.BASE_ENDPOINT);
        if (status !== "success") return res.sendStatus(503);
        return await page.property('content');
    });
    console.log(content)
    res.sendStatus(200);
});


module.exports = router;