const { Router } = require("express");
const Midleware = require("../app/Midlewares/AuthMidleware");
const Controller = require("../app/controllers/InfluencersTokensControllers");
const InfluencersTokensRoutes = new Router();
const routes = InfluencersTokensRoutes;
const prefix = "/influencers-tokens";
routes.get(prefix, Midleware, Controller.index);
routes.get(`${prefix}/show/:token`, Midleware, Controller.show);
routes.get(`${prefix}/useds`, Midleware, Controller.useds);
routes.post(`${prefix}/insert`, Midleware, Controller.store);
routes.post(`${prefix}/rescue`, Midleware, Controller.update);
/* routes.get(`${prefix}/influencer/{id}`, Midleware, Controller.byInfluencer); */

module.exports = InfluencersTokensRoutes;
