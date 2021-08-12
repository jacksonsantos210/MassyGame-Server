const Logger = require("../utils/logger");
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
      const { email, password } = req.body;
      if (!(await AuthSchema.isValid(req.body))) {
        return res.status(400).json({
          message: "Ops! Dados Inválidos.",
        });
      }
      const player = await Player.findOne({
        where: { email: email },
        include: { association: "albums" },
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
        req.connection.socket.remoteAddress;
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
      console.error(error);
      return res.status(400).json({
        message: "Ops! Falha ao validar seus dados",
      });
    }
  }

  async logout(req, res) {
    try {
      let valid = null;
      if (req.user_type === "player") {
        valid = await PlayersSession.update(
          { logged: false },
          { where: { player_id: req.user_id } }
        );
      } else if (req.user_type === "developer") {
        valid = await DevelopersSession.update(
          { logged: false },
          { where: { admin_id: req.user_id } }
        );
      } else if (req.user_type === "admin") {
        valid = await AdminsSession.update(
          { logged: false },
          { where: { developer_id: req.user_id } }
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
