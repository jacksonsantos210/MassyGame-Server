const { Router } = require("express");

const AuthMidleware = require("./app/Midlewares/AuthMidleware");
const AuthController = require("./app/Controllers/AuthController");
const PlayersController = require("./app/controllers/PlayersController");

const routes = new Router();

routes.post("/auth/player", AuthController.playerLogIn);
//routes.post("/auth/admin", AuthController.adminLogIn);
//routes.post("/auth/developer", AuthController.developerLogIn);

/* Players */
routes.get("/players", PlayersController.index);
routes.get("/player/:id", AuthMidleware, PlayersController.show);
routes.get("/player/find", AuthMidleware, PlayersController.find);
routes.post("/player/register", PlayersController.store);
//routes.post("/player/update/:id", PlayersController.update);

/* Figures */
//routes.get("/figures", AuthMidleware, PlayersController.index);
//routes.get("/figure/:id", AuthMidleware, PlayersController.show);
//routes.post("/figures", PlayersController.store);
//routes.put("/figures/:id", PlayersController.update);
//routes.delete("/figure/:id", PlayersController.delete);
//routes.get("/figures/promo/:id");

module.exports = routes;
