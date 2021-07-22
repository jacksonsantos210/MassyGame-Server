const { Router } = require("express");
const AuthMidleware = require("./app/Midlewares/AuthMidleware");
const AuthController = require("./app/controllers/AuthController");
const PlayersController = require("./app/controllers/PlayersController");
const FiguresController = require("./app/controllers/FiguresController");
const AlbunsController = require("./app/controllers/AlbunsController");

const routes = new Router();
console.log("APP -> Load routes");
/* Auth */
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
routes.get("/figures/premier", AuthMidleware, FiguresController.getPremier);

/* Albuns */
routes.get("/albums", AuthMidleware, AlbunsController.index);
routes.get("/albums/show/:id", AuthMidleware, AlbunsController.show);
routes.get("/albums/player/:id", AuthMidleware, AlbunsController.findByPlayer);
routes.post("/albums/create", AuthMidleware, AlbunsController.store);
//routes.put("/albums/update/:id",AuthMidleware,  AlbunsController.update);
//routes.delete("/albums/delete:id",AuthMidleware,  AlbunsController.delete);

module.exports = routes;
