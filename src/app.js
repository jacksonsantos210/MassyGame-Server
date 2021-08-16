require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Logger = require("./app/utils/logger");

require("./database");
//routes
const General = require("./routes/general.routes");
const Albums = require("./routes/albums.routes");
const Auth = require("./routes/auth.routes");
const FiguresTypes = require("./routes/figures-types.routes");
const Figures = require("./routes/figures.routes");
const Players = require("./routes/player.routes");
const Ranks = require("./routes/rank.routes");
const Stands = require("./routes/stands.routes");

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    Logger.game("info", "Server initialized");
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.header("Access-Control-Allow-Headers", "*");
      this.app.use(cors());
      next();
    });
  }

  routes() {
    this.app.use(General);
    this.app.use(Albums);
    this.app.use(Auth);
    this.app.use(FiguresTypes);
    this.app.use(Figures);
    this.app.use(Players);
    this.app.use(Ranks);
    this.app.use(Stands);
  }
}

module.exports = new App().app;
