const router = require('express').Router();
const config = require("../config");
const Crawler = require("crawler");

const crawler = new Crawler({
    jQuery : true
});

router.get("/:player_name", async (req, res) => {
    await crawler.direct({
        uri : `${config.BASE_ENDPOINT}/pemain/${req.params.player_name}`,
        callback : (error, data) => {
            const $ = data.$;
            if(error) return res.sendStatus(503);
            if($(".main--club").length === 0) return res.sendStatus(403);

            let sub_listing = $(".inner-banner__sublisting");
            let birth = sub_listing.eq(4).find(".description").text().trim().split("/");
            let body = sub_listing.eq(5).find(".description").text().trim().split("/");

            let statistic_table = $("#statistik .table--pemain>tbody>tr");

            let player_data = {
                name : $(".nama-pemain").text(),
                club : sub_listing.eq(0).find(".description").text().trim(),
                country : sub_listing.eq(1).find(".description").text().trim(),
                position : sub_listing.eq(2).find(".description").text().trim(),
                number : parseInt(sub_listing.eq(3).find(".description").text().trim()),
                birth_place : birth[0],
                birth_date : birth[1],
                height : body[0],
                weight : body[1],
                statistic : {
                    goal : parseInt(statistic_table.eq(0).find("td:last-child").text()),
                    assist : parseInt(statistic_table.eq(1).find("td:last-child").text()),
                    foul : parseInt(statistic_table.eq(2).find("td:last-child").text()),
                    tackled_by_opposite : parseInt(statistic_table.eq(3).find("td:last-child").text()),
                    yellow_card : parseInt(statistic_table.eq(4).find("td:last-child").text()),
                    shot_accuracy_rate : `${statistic_table.eq(5).find("td:last-child").text()} %`,
                    pass_accuracy_rate : `${statistic_table.eq(6).find("td:last-child").text()} %`,
                    cross_pass_accuracy_rate : `${statistic_table.eq(7).find("td:last-child").text()} %`,
                    dribble_success_rate : `${statistic_table.eq(8).find("td:last-child").text()} %`,
                    tackle_success_rate : `${statistic_table.eq(9).find("td:last-child").text()} %`,
                }
            }
            return res.send(player_data);
        }
    });
});

module.exports = router;