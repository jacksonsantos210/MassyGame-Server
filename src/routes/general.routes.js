const { Router } = require("express");
const Midleware = require("../app/Midlewares/AuthMidleware");
const Controller = require("../app/controllers/FiguresController");
const GeneralRoutes = new Router();
const routes = GeneralRoutes;
routes.get("/", Midleware, function () {
  return "Hello, wellcome, this is a api server os Massey Game";
});
module.exports = GeneralRoutes;
