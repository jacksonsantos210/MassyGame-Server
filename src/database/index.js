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
const Stand = require("../app/models/Stand");
const FiguresType = require("../app/models/FiguresType");

//start connection
const connection = new Sequelize(dbConfig);
Admin.init(connection);
AdminsSession.init(connection);
Album.init(connection);
Developer.init(connection);
DevelopersSession.init(connection);
FiguresType.init(connection);
Figure.init(connection);
Log.init(connection);
Player.init(connection);
PlayersSession.init(connection);
Premier.init(connection);
Stand.init(connection);
//Associates
console.log("APP-> Model-Associations: registrations in initializing");
Album.associate(connection.models);
Figure.associate(connection.models);
Player.associate(connection.models);
Stand.associate(connection.models);
Premier.associate(connection.models);
console.log("APP-> Model-Associations: registrations has been initialized");

module.exports = connection;
