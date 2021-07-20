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
          message: "Dados inválidos",
          data: null,
        });
      }
      const { email, password } = req.body;
      console.log("LogIn Attempt: " + email);
      const player = await Player.findOne({
        where: { email: email },
        attributes: { exclude: ["password"] },
      });
      console.log(player);
      if (!player) {
        console.error("player not exists");
        return res.status(400).json({
          message: "Ops! Dados incorretos ou jogador inexistente.",
          data: null,
        });
      }
      if (!(await bcrypt.compare(req.body.password, player.password))) {
        console.error("password error");
        return res.status(400).json({
          message: "Ops! Dados incorretos ou jogador inexistente.",
          data: null,
        });
      }
      return res.status(200).json({
        message: "success",
        data: {
          player: player,
          token: jwt.sign({ id: player.id }, config.secret, {
            expiresIn: config.expireIn,
          }),
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        message: "Ops! Falha ao validar seus dados",
        error: error,
      });
    }
  }
}

module.exports = new AuthController();
