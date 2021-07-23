const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
// import models
const Admin = require("../app/models/Admin");
const AdminsSession = require("../app/models/AdminsSession");
const Album = require("../app/models/Album");
const Developer = require("../app/models/Developer");
const DevelopersSession = require("../app/models/DevelopersSession");
const Figure = require("../app/models/Figure");
const Log = require("../app/models/Log");
const Player = require("../app/models/Player");
const PlayersSession = require("../app/models/PlayersSession");
const Premier = require("../app/models/Premier");
const Rank = require("../app/models/Rank");

//start connection
const connection = new Sequelize(dbConfig);
Admin.init(connection);
AdminsSession.init(connection);
Album.init(connection);

Developer.init(connection);
DevelopersSession.init(connection);
Figure.init(connection);
Log.init(connection);
Player.init(connection);
PlayersSession.init(connection);
Premier.init(connection);
Rank.init(connection);
//Associates
/* Album.associateFigure(Figure);
Album.associatePlayer(Player);
Figure.associateAlbum(Album);
Player.associateAlbum(Player); */

module.exports = connection;
