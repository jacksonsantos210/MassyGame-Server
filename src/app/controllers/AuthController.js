const Player = require("../models/Player");
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
      console.log("LogIn Attempt: " + email);
      const player = await Player.findOne({
        where: { email: email },
      });
      console.log(player);
      if (!player) {
        console.error("player not exists");
        return res.status(400).json({
          message: "Ops! Dados incorretos ou jogador inexistente.",
        });
      }
      if (!(await bcrypt.compare(password, player.password))) {
        console.error("password error");
        return res.status(400).json({
          message: "Ops! Dados incorretos ou jogador inexistente.",
        });
      }
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
}

module.exports = new AuthController();
