const { Router } = require("express");
const Midleware = require("../app/Midlewares/AuthMidleware");
const Controller = require("../app/controllers/FiguresController");
const FiguresRoutes = new Router();
const routes = FiguresRoutes;
routes.get("/figures", Midleware, Controller.index);
routes.get("/figures/premier/verify", Midleware, Controller.verifyPremier);
routes.get("/figures/premier/open", Midleware, Controller.getPremier);
/* routes.post("/figures/create", Midleware, Controller.store); */
module.exports = FiguresRoutes;
