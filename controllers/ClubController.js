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
                    stadium : club.find(".title-place").text(),
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

function getClubSummary(element, index, need_parse = false){
    let result = element.find("tr").eq(index).find("td").text();
    return need_parse ? parseInt(result || 0) : result;
}

router.get("/:club_name", async (req, res) => {
    await crawler.direct({
        uri : `${config.BASE_ENDPOINT}/klub/${req.params.club_name}`,
        callback : (error, data) => {
            const $ = data.$;
            if(error) return res.sendStatus(503);
            if($(".main--club").length === 0) return res.sendStatus(403);
            
            let sub_listing = $(".inner-banner__listing .inner-banner__sublisting");

            let section_facts = $(".club-section-fact .col-md-3");
            let attack_box = section_facts.eq(0).find(".column__body>table>tbody");
            let defend_box = section_facts.eq(1).find(".column__body>table>tbody");
            let discipline_box = section_facts.eq(2).find(".column__body>table>tbody");

            let players = [];

            let club_data = {
                name : $(".klub--name").text(),
                since : sub_listing.eq(0).find(".description").text(),
                city : sub_listing.eq(1).find(".description").text(),
                stadium : sub_listing.eq(2).find(".description").text(),
                coach : sub_listing.eq(3).find(".description").text(),
                attack : {
                    goal : getClubSummary(attack_box, 0, true),
                    shot : getClubSummary(attack_box, 1, true),
                    shot_on_goal : getClubSummary(attack_box, 2, true),
                    assist_accuracy_rate : getClubSummary(attack_box, 3),
                    drible_success_rate : getClubSummary(attack_box, 4)
                },
                defend : {
                    goal_in : getClubSummary(defend_box, 0, true),
                    safe : getClubSummary(defend_box, 1, true),
                    tackle : getClubSummary(defend_box, 2, true),
                    tackle_success_rate : getClubSummary(defend_box, 3),
                    clearance : getClubSummary(defend_box, 4, true)
                },
                discipline : {
                    fouls : getClubSummary(discipline_box, 0, true),
                    tackled_by_opposite : getClubSummary(discipline_box, 1, true),
                    offside : getClubSummary(discipline_box, 2, true),
                    yellow_card : getClubSummary(discipline_box, 3),
                    red_card : getClubSummary(discipline_box, 4, true)
                },
                players : players
            };
            
            return res.send(club_data);
        }
    });
});

module.exports = router;