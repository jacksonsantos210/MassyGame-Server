const { Router } = require("express");
const Midleware = require("../app/Midlewares/AuthMidleware");
const Controller = require("../app/controllers/FiguresController");
const FiguresTypesRoutes = new Router();
const routes = FiguresTypesRoutes;
routes.get("/types", Midleware, Controller.index);
routes.get("/types/show/:id", Midleware, Controller.show);
routes.post("/types/create", Midleware, Controller.store);
module.exports = FiguresTypesRoutes;
