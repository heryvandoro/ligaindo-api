const router = require('express').Router();
const config = require("../config");
const Crawler = require("crawler");

const crawler = new Crawler({
    jQuery : true
});

router.get("/", async (req, res) => {
    await crawler.direct({
        uri : `${config.BASE_ENDPOINT}/jadwal`,
        callback : (error, data) => {
            if(error) return res.sendStatus(503);
            const $ = data.$;
            
            let schedules = [];
            let schedule_box = $(".column--jadwal__slider tr");
            
            schedule_box.each((index, schedule) => {
                let schedule_data = {
                    detail_url : $(schedule).data("href"),
                    team1 : {
                        name : $(schedule).find("td").eq(0).text(),
                        image : $(schedule).find("td").eq(1).find("img").attr("src")
                    },
                    team2 : {
                        name : $(schedule).find("td").eq(4).text().trim(),
                        image : $(schedule).find("td").eq(3).find("img").attr("src")
                    },
                    stadion : $(schedule).find("td").eq(5).find("span").text(),
                    date : $(schedule).find("td").eq(6).find("span").text(),
                    time : $(schedule).find("td").eq(2).find("span").text(),
                };
                schedules.push(schedule_data);
            });

            res.send(schedules);
        }
    });
});

module.exports = router;