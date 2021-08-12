const { Router } = require("express");
const Midleware = require("../app/Midlewares/AuthMidleware");
const Controller = require("../app/controllers/StandsController");
const StandsRoutes = new Router();
var routes = StandsRoutes;
routes.get("/stands", Midleware, Controller.index);
routes.get("/stands/show/:id", Midleware, Controller.show);
routes.get("/stands/player", Midleware, Controller.findByPlayer);
routes.post("/stands/create", Midleware, Controller.store);
routes.post("/stands/buy", Midleware, Controller.buy);
module.exports = StandsRoutes;
