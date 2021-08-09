const { Router } = require("express");
//Midlewares
const AuthMidleware = require("./app/Midlewares/AuthMidleware");
//Controllers
const AlbunsController = require("./app/controllers/AlbunsController");
const AuthController = require("./app/controllers/AuthController");
const FiguresController = require("./app/controllers/FiguresController");
const FiguresTypesController = require("./app/controllers/FiguresTypesController");
const PlayersController = require("./app/controllers/PlayersController");
const RankController = require("./app/controllers/RankController");
const StandsController = require("./app/controllers/StandsController");

const routes = new Router();
console.log("APP -> Load routes");
routes.get("/", function (req, res) {
  return "Welcome, this is a Massey Game Server";
});

/* Auth */
routes.post("/auth/player", AuthController.playerLogIn);
//routes.post("/auth/admin", AuthController.adminLogIn);
//routes.post("/auth/developer", AuthController.developerLogIn);
routes.post("/logout/:type", AuthMidleware, AuthController.logout);
routes.get("/me/:type", AuthMidleware, AuthController.me);
/* Players */
routes.get("/players", AuthMidleware, PlayersController.index);
routes.get("/players/show/", AuthMidleware, PlayersController.show);
routes.post("/players/register", PlayersController.store); //Função Pública de Registro
routes.post("/players/update", AuthMidleware, PlayersController.update);
routes.get(
  "/players/change-audio/:state",
  AuthMidleware,
  PlayersController.changeAudio
);
routes.get(
  "/players/accept-rule",
  AuthMidleware,
  PlayersController.acceptRules
);
/* routes.get("/rank/global", AuthMidleware, RankController.global);
routes.get("/rank/top", AuthMidleware, RankController.top);
routes.get("/rank/player", AuthMidleware, RankController.player); */
/* Albuns */
routes.get("/figures-types", AuthMidleware, FiguresTypesController.index);
routes.get(
  "/figures-types/show/:id",
  AuthMidleware,
  FiguresTypesController.show
);
routes.post(
  "/figures-types/create",
  AuthMidleware,
  FiguresTypesController.store
);
//routes.put("/figures-types/update/:id",AuthMidleware,  AlbunsController.update);
//routes.delete("/figures-types/delete:id",AuthMidleware,  AlbunsController.delete);

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
routes.get("/albums/player", AuthMidleware, AlbunsController.findByPlayer);
routes.get("/albums/historic", AuthMidleware, AlbunsController.historic);
routes.post("/albums/create", AuthMidleware, AlbunsController.store);
//routes.put("/albums/update/:id",AuthMidleware,  AlbunsController.update);
//routes.delete("/albums/delete:id",AuthMidleware,  AlbunsController.delete);

/* Albuns */
routes.get("/stands", AuthMidleware, StandsController.index);
routes.get("/stands/show/:id", AuthMidleware, StandsController.show);
routes.get("/stands/player", AuthMidleware, StandsController.findByPlayer);
routes.post("/stands/create", AuthMidleware, StandsController.store);
routes.post("/stands/buy", AuthMidleware, StandsController.buy);
//routes.put("/stands/update/:id",AuthMidleware,  StandsController.update);
//routes.delete("/stands/delete:id",AuthMidleware,  StandsController.delete);

routes.get("/rank", AuthMidleware, RankController.index);

module.exports = routes;
