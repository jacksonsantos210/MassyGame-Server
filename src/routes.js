const { Router } = require("express");

const AuthMidleware = require("./app/Midlewares/AuthMidleware");
const AuthController = require("./app/controllers/AuthController");
const PlayersController = require("./app/controllers/PlayersController");
const FiguresController = require("./app/controllers/FiguresController");
const AlbunsController = require("./app/controllers/AlbunsController");

const routes = new Router();

routes.post("/auth/player", AuthController.playerLogIn);
//routes.post("/auth/admin", AuthController.adminLogIn);
//routes.post("/auth/developer", AuthController.developerLogIn);

/* Players */
routes.get("/players", AuthMidleware, PlayersController.index);
routes.get("/players/show/:id", AuthMidleware, PlayersController.show);
routes.post("/players/register", PlayersController.store); //Função Pública de Registro
routes.post("/players/update", AuthMidleware, PlayersController.update);

/* Figures */
routes.get("/figures", AuthMidleware, FiguresController.index);
//routes.get("/figures/:id", AuthMidleware, FiguresController.show);
routes.post("/figures/create", AuthMidleware, FiguresController.store);
//routes.put("/figures/:id",AuthMidleware,  FiguresController.update);
//routes.delete("/figure/:id",AuthMidleware,  FiguresController.delete);
//routes.get("/figures/promo/:id");

/* Albuns */
routes.get("/albuns", AuthMidleware, AlbunsController.index);
//routes.get("/albuns/:id", AuthMidleware, FiguresController.show);
//routes.post("/albuns/create", AuthMidleware, FiguresController.store);
//routes.put("/albuns/:id",AuthMidleware,  FiguresController.update);
//routes.delete("/albuns/:id",AuthMidleware,  FiguresController.delete);

module.exports = routes;
