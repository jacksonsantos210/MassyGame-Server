const Player = require("../Models/Player");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth");
const AuthSchema = require("../yup/AuthSchema");

class AuthController {
  async playerLogIn(req, res) {
    try {
      console.warn(req.body);
      const player = await Player.findAll({ order: [["id", "DESC"]] });

      console.log(player);
      /*  if (!(await AuthSchema.isValid(req.body))) {
        return res.status(400).json({
          message: "Dados inválidos",
        });
      }
      const { email, password } = req.body;
      console.log("LogIn Attempt: " + email); */
      /* const playerExist = await Player.findByPk(6);
      console.log(playerExist); */
      /* if (!playerExist) {
        console.error("user not exists");
        return res.status(400).json({
          message: "Ops! Dados incorretos ou usuário inexistente.",
        });
      }
      if (!(await bcrypt.compare(req.body.password, playerExist.password))) {
        console.error("Password error");
        return res.status(400).json({
          message: "Ops! Dados incorretos ou usuário inexistente.",
        });
      }
      console.log("aqui");
      return res.status(200).json({
        player: playerExist,
        token: jwt.sign({ id: playerExist.id }, config.secret, {
          expiresIn: config.expireIn,
        }),
      }); */
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        message: "Ops! Falha ao validar seus dados",
      });
    }
  }
}

module.exports = new AuthController();
