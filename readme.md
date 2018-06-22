# Liga Gojek Indonesia API
An-unofficial API of Liga Gojek Indonesia, data was crawled from [https://liga-indonesia.id](https://liga-indonesia.id) sites. This API are not recommended used for production, just for self learning. Use with your own risk!

## Stack
* NodeJS + ExpressJS
* Crawler from `https://github.com/bda-research/node-crawler`

## How To
* Clone this repository `git clone http://github.com/heryvandoro/ligaindo-api.git`
* Run `npm install`
* Config `.env` file for custom port and set your BASE_URL in `config.js` file (optional)
* Start index.js with node/nodemon/etc

# Routes

| Method | Path                   | Functional                                                            |
| ------ | ---------------------- | --------------------------------------------------------------------  |
| GET    | /clubs                 | Get all clubs data                                                    |
| GET    | /clubs/`club_name`     | Get club detail based on club name (obtained from original site slug) |
| GET    | /players/`player_name` | Get player detail based on player name                                |
| GET    | /classements           | Get current classements league data                                   |
| GET    | /schedules             | Get match schedules on current week                                   |

## Disclaimer
This API could be worked for a few moment, until the site developer changes their web structure :D
Use with your own risk!