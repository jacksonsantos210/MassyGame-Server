const { Router } = require("express");
const Midleware = require("../app/Midlewares/AuthMidleware");
const Controller = require("../app/controllers/AuthController");
const AuthRoutes = new Router();
const routes = AuthRoutes;
routes.post("/auth/player", Controller.playerLogIn);
//routes.post("/auth/admin", Controller.adminLogIn);
//routes.post("/auth/developer", Controller.developerLogIn);
routes.get("/logout", Midleware, Controller.logout);
module.exports = AuthRoutes;
