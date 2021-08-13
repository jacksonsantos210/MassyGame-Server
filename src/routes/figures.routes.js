const { Router } = require("express");
const Midleware = require("../app/Midlewares/AuthMidleware");
const Controller = require("../app/controllers/FiguresController");
const FiguresRoutes = new Router();
const routes = FiguresRoutes;
routes.get("/figures", Midleware, Controller.index);
routes.get("/figures/:id", Midleware, Controller.show);
routes.get("/figures/premier/verify", Midleware, Controller.verifyPremier);
routes.post("/figures/premier/get", Midleware, Controller.getPremier);
routes.post("/figures/premier/open", Midleware, Controller.openPremier);
/* routes.post("/figures/create", Midleware, Controller.store); */
module.exports = FiguresRoutes;
