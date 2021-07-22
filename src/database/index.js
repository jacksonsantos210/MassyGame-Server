const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
// import models
const Player = require("../app/models/Player");
const Figure = require("../app/models/Figure");
const Rank = require("../app/models/Rank");
const Album = require("../app/models/Album");
//start connection
const connection = new Sequelize(dbConfig);
Player.init(connection);
Figure.init(connection);
Rank.init(connection);
Album.init(connection);

module.exports = connection;
