require("dotenv").config();
const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
// import models
const Admin = require("../app/models/Admin");
const AdminsSession = require("../app/models/AdminsSession");
const Album = require("../app/models/Album");
const Developer = require("../app/models/Developer");
const DevelopersSession = require("../app/models/DevelopersSession");
const Influencer = require("../app/models/Influencer");
const InfluencersUsed = require("../app/models/InfluencersUsed");
const Figure = require("../app/models/Figure");
const Player = require("../app/models/Player");
const PlayersSession = require("../app/models/PlayersSession");
const Premier = require("../app/models/Premier");
const Stand = require("../app/models/Stand");
const FiguresType = require("../app/models/FiguresType");
const PlayersToken = require("../app/models/PlayersToken");

//start connection
const connection = new Sequelize(dbConfig);
Admin.init(connection);
AdminsSession.init(connection);
Album.init(connection);
Developer.init(connection);
DevelopersSession.init(connection);
Influencer.init(connection);
InfluencersUsed.init(connection);
FiguresType.init(connection);
Figure.init(connection);
Player.init(connection);
PlayersToken.init(connection);
PlayersSession.init(connection);
Premier.init(connection);
Stand.init(connection);
//Associates
Album.associate(connection.models);
Influencer.associate(connection.models);
InfluencersUsed.associate(connection.models);
FiguresType.associate(connection.models);
Figure.associate(connection.models);
Player.associate(connection.models);
PlayersToken.init(connection);
Stand.associate(connection.models);
Premier.associate(connection.models);

module.exports = connection;

// influencers/rescue
