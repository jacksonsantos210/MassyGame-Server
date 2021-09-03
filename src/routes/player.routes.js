const { Router } = require("express");
const Midleware = require("../app/Midlewares/AuthMidleware");
const Controller = require("../app/controllers/PlayersController");
const PlayerRoutes = new Router();
var routes = PlayerRoutes;
routes.get("/players", Midleware, Controller.index);
routes.get("/players/me", Midleware, Controller.myData);
routes.get("/players/show/:id", Midleware, Controller.show);
routes.post("/players/register", Controller.store); //Função Pública de Registro
routes.post("/players/update", Midleware, Controller.update);
routes.get("/players/audio/:state", Midleware, Controller.audio);
routes.get("/players/rules", Midleware, Controller.rules);
routes.post("/players/recovery", Midleware, Controller.recovery);
routes.post("/players/token-validade", Midleware, Controller.validateToken);
routes.post("/players/change-password", Midleware, Controller.changePassword);
module.exports = PlayerRoutes;
