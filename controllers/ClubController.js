const router = require('express').Router();
const config = require("../config");
const Crawler = require("crawler");

const crawler = new Crawler({
    jQuery : true
});

router.get("/", async (req, res) => {
    await crawler.direct({
        uri : `${config.BASE_ENDPOINT}/klub`,
        callback : (error, data) => {
            if(error) return res.sendStatus(503);
            const $ = data.$;
            let clubs = [];
            let clubs_dom = $(".container .card--club .wrapper");
            clubs_dom.each((i, club) => {
                club = $(club);
                let slug = club.find("a").eq(0).attr("href").split("/");
                slug = slug[slug.length-1];
                let club_data = {
                    name : club.find(".club-title").text(),
                    stadion : club.find(".title-place").text(),
                    city : club.find(".place-name").text(),
                    image : club.find("img").attr("src"),
                    detail_url : `${config.BASE_URL}/clubs/${slug}`
                };
                clubs.push(club_data);
            });
            res.send(clubs);
        }
    });
});

router.get("/:club_name", async (req, res) => {
    await crawler.direct({
        uri : `${config.BASE_ENDPOINT}/klub/${req.params.club_name}`,
        callback : (error, data) => {
            if(error) return res.sendStatus(503);
            const $ = data.$;
            let clubs = [];
            let clubs_dom = $(".container .card--club .wrapper");
            clubs_dom.each((i, club) => {
                club = $(club);
                let club_data = {
                    name : club.find(".club-title").text(),
                    stadion : club.find(".title-place").text(),
                    city : club.find(".place-name").text(),
                    image : club.find("img").attr("src")
                };
                clubs.push(club_data);
            });
            res.send(clubs);
        }
    });
});

module.exports = router;