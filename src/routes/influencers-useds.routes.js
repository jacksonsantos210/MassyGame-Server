const { Router } = require("express");
const Midleware = require("../app/Midlewares/AuthMidleware");
const Controller = require("../app/controllers/InfluencersUsedsControllers");
const InfluencersUsedsRoutes = new Router();
const routes = InfluencersUsedsRoutes;
const prefix = "/influencers-useds";
routes.get(prefix, Midleware, Controller.index);
routes.get(`${prefix}/show/:token`, Midleware, Controller.show);
routes.get(`${prefix}/useds`, Midleware, Controller.useds);
routes.post(`${prefix}/insert`, Midleware, Controller.store);

module.exports = InfluencersUsedsRoutes;
