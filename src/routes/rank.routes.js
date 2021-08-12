const { Router } = require("express");
const Midleware = require("../app/Midlewares/AuthMidleware");
const Controller = require("../app/controllers/RankController");
const RankRoutes = new Router();
const routes = RankRoutes;
routes.get("/rank", Midleware, Controller.index);
module.exports = RankRoutes;
