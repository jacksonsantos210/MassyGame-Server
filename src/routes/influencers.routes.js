const { Router } = require("express");
const Midleware = require("../app/Midlewares/AuthMidleware");
const Controller = require("../app/controllers/InfluencersControllers");
const InfluencersRoutes = new Router();
const routes = InfluencersRoutes;
routes.get("/influencers", Midleware, Controller.index);
routes.post("/influencers/insert", Midleware, Controller.store);
routes.get("/influencers/show/:id", Midleware, Controller.show);
routes.post("/influencers/update/:id", Midleware, Controller.update);
module.exports = InfluencersRoutes;