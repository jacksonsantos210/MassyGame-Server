const moment = require("moment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Logger = require("../utils/logger");
const Player = require("../models/Player");
const PlayersSession = require("../models/PlayersSession");
const Developer = require("../models/Developer");
const DevelopersSession = require("../models/DevelopersSession");
const Admin = require("../models/Admin");
const AdminSession = require("../models/AdminsSession");

const config = require("../../config/auth");
const AuthSchema = require("../yup/AuthSchema");

class AuthController {
  async playerLogIn(req, res) {
    try {
      const { email, password } = req.body;
      if (!(await AuthSchema.isValid(req.body))) {
        return res.status(400).json({
          message: "Ops! Dados Inválidos.",
        });
      }
      const player = await Player.findOne({
        where: { email: email },
      });
      if (!player) {
        return res.status(400).json({
          message: "Ops! Dados incorretos ou jogador inexistente.  001",
        });
      }
      if (!(await bcrypt.compare(password, player.password))) {
        return res.status(400).json({
          message: "Ops! Dados incorretos ou jogador inexistente.  002",
        });
      }
      const token = jwt.sign(
        { id: player.id, user_type: "player" },
        config.secret,
        {
          expiresIn: config.expireIn,
        }
      );
      const ipCliente =
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress ||
        null;
      await PlayersSession.update(
        { logged: false },
        { where: { player_id: player.id } }
      );
      await PlayersSession.create({
        player_id: player.id,
        token: token,
        ip_address: ipCliente,
        user_agent: req.get("user-agent"),
        payload: "",
        logged: true,
      });

      player.password = undefined;
      return res.status(200).json({
        token: token,
        player: player,
      });
    } catch (error) {
      Logger.game("error", "AlbumsController.playerLogIn -> ERROR: " + error);
      return res.status(400).json({
        message: "Ops! Falha ao validar seus dados",
      });
    }
  }

  async adminLogIn(req, res) {
    try {
      const { email, password } = req.body;
      if (!(await AuthSchema.isValid(req.body))) {
        return res.status(400).json({
          message: "Ops! Dados Inválidos.",
        });
      }
      const admin = await Admin.findOne({
        where: { email: email },
      });
      if (!admin) {
        return res.status(400).json({
          message: "Ops! Dados incorretos ou administrador inexistente.  001",
        });
      }
      if (!(await bcrypt.compare(password, admin.password))) {
        return res.status(400).json({
          message: "Ops! Dados incorretos ou administrador inexistente.  002",
        });
      }
      const token = jwt.sign(
        { id: admin.id, user_type: "admin" },
        config.secret,
        {
          expiresIn: config.expireIn,
        }
      );
      const ipCliente =
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress ||
        null;
      await AdminSession.create({
        admin_id: admin.id,
        token: token,
        ip_address: ipCliente,
        user_agent: req.get("user-agent"),
        payload: "",
        logged: true,
      });

      admin.password = undefined;
      return res.status(200).json({
        token: token,
        admin: admin,
      });
    } catch (error) {
      Logger.admin("error", "AlbumsController.adminLogIn -> ERROR: " + error);
      return res.status(400).json({
        message: "Ops! Falha ao validar seus dados",
      });
    }
  }

  async logoutPlayer(req, res) {
    try {
      const valid = await PlayersSession.update(
        { logged: false },
        { where: { player_id: req.user_id } }
      );

      const sessions = await PlayersSession.findAll({
        where: { player_id: req.user_id },
      });
      console.log(sessions);
      var calc = 0;
      sessions.forEach((element) => {
        console.log("nova linha");
        let thisMoment = new Date();

        var a = moment([
          element.createdAt.getUTCFullYear(),
          element.createdAt.getUTCMonth(),
          element.createdAt.getUTCDay(),
        ]);
        var b = moment([
          thisMoment.getUTCFullYear(),
          thisMoment.getUTCMonth(),
          thisMoment.getUTCDay(),
        ]);
        let dateDiff = a.diff(b, "hours");
        console.log(dateDiff);
      });

      return res.status(200).json({
        message: "Logout",
        result: valid,
      });
    } catch (error) {
      Logger.game("error", "AlbumsController.logoutPLayer -> ERROR: " + error);
      return res.status(500).json({
        message: "Ops! Falha ao desconectar",
      });
    }
  }

  async logoutAdmin(req, res) {
    try {
      valid = await AdminsSession.update(
        { logged: false },
        { where: { developer_id: req.user_id } }
      );
      return res.status(200).json({
        message: "Logout",
        result: valid,
      });
    } catch (error) {
      Logger.admin("error", "AlbumsController.logoutAdmin -> ERROR: " + error);
      return res.status(500).json({
        message: "Ops! Falha ao desconectar",
      });
    }
  }
}

module.exports = new AuthController();
