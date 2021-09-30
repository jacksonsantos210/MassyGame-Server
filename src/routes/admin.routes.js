const { Router } = require("express");
const Midleware = require("../app/Midlewares/AuthMidleware");
const Controller = require("../app/controllers/AdminsController");
const AdminRoutes = new Router();
var routes = AdminRoutes;
routes.get("/admins", Midleware, Controller.index);
routes.get("/admins/show/:id", Midleware, Controller.show);
routes.post("/admins/create", Controller.store); //Função Pública de Registro
routes.post("/admins/update", Midleware, Controller.update);
routes.post("/admins/change-password", Midleware, Controller.changePassword);
module.exports = AdminRoutes;
