const Logs = require("./LogsController");
const Player = require("../models/Player");
const PlayersSession = require("../models/PlayersSession");
const Developer = require("../models/Developer");
const DevelopersSession = require("../models/DevelopersSession");
const Admin = require("../models/Admin");
const AdminsSession = require("../models/AdminsSession");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth");
const AuthSchema = require("../yup/AuthSchema");

class AuthController {
  async playerLogIn(req, res) {
    try {
      if (!(await AuthSchema.isValid(req.body))) {
        return res.status(400).json({
          message: "Ops! Dados Inválidos.",
        });
      }
      const { email, password } = req.body;
      //Logs.save("login_Attempt", `login atempt: ${email}`, "player");
      const player = await Player.findOne({
        where: { email: email },
      });
      if (!player) {
        /*  Logs.save(
          "login_error",
          `player: ${req.body.email} not found`,
          "player"
        ); */
        return res.status(400).json({
          message: "Ops! Dados incorretos ou jogador inexistente.",
        });
      }
      if (!(await bcrypt.compare(password, player.password))) {
        /* Logs.save(
          "login_error",
          `player: ${req.body.email} password error`,
          "player"
        ); */
        return res.status(400).json({
          message: "Ops! Dados incorretos ou jogador inexistente.",
        });
      }
      /* Logs.save("login_success", `player: ${req.body.email}`, "player");
      Logs.save("register_session", `create session to player : ${player.id}`, 'player');
     await PlayersSession.create();  */
      return res.status(200).json({
        player: player,
        token: jwt.sign({ id: player.id }, config.secret, {
          expiresIn: config.expireIn,
        }),
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        message: "Ops! Falha ao validar seus dados",
      });
    }
  }

  async logout(req, res) {
    try {
      const { type, id } = req.params;
      Logs.save(
        "unregister_Session",
        `update session to ${type} : ${id}`,
        type
      );
      if (type === "player") {
        const valid = await PlayersSession.update(
          { logged: false },
          { where: { player_id: id } }
        );
      } else if (type === "developer") {
        const valid = await DevelopersSession.update(
          { logged: false },
          { where: { developer_id: id } }
        );
      } else if (type === "admin") {
        const valid = await AdminsSession.update(
          { logged: false },
          { where: { admin_id: id } }
        );
      }
      return res.status(200).json({
        message: "Logout",
        result: valid,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Ops! Falha ao desconectar",
      });
    }
  }
}

module.exports = new AuthController();
