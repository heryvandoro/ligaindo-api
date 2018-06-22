const router = require('express').Router();
const config = require("../config");
const Crawler = require("crawler");

const crawler = new Crawler({
    jQuery : true
});

router.get("/", async (req, res) => {
    await crawler.direct({
        uri : `${config.BASE_ENDPOINT}/klasemen/go-jek-liga-1-2018/-`,
        callback : (error, data) => {
            if(error) return res.sendStatus(503);
            const $ = data.$;
            
            let classement_table = $(".table-responsive--klasemen table>tbody>tr");
            let classements = [];

            classement_table.each((index, row) => {
                let row_data = {
                    position : parseInt($(row).find("td").eq(0).text()),
                    image : $(row).find("td").eq(1).find("img").attr("src"),
                    name : $(row).find("td").eq(2).text(),
                    total_play : parseInt($(row).find("td").eq(3).text()),
                    win : parseInt($(row).find("td").eq(4).text()),
                    draw : parseInt($(row).find("td").eq(5).text()),
                    lose : parseInt($(row).find("td").eq(6).text()),
                    goal : parseInt($(row).find("td").eq(7).text()),
                    goal_in : parseInt($(row).find("td").eq(8).text()),
                    point : parseInt($(row).find("td").eq(9).text().trim()),
                };
                classements.push(row_data);
            });

            res.send(classements);
        }
    });
});

module.exports = router;