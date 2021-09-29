const Logger = require("../utils/logger");
const AdminSchema = require("../yup/AdminSchema");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

class AdminsController {
  async index(req, res) {
    try {
      const admin = await Admin.findAll();
      return res.status(200).json({
        admin: albums,
      });
    } catch (error) {
      Logger.game("error", "AlbumsController.index -> ERROR: " + error);
      return res.status(500).json({
        message: "Erro ao tentar listar albuns",
      });
    }
  }

  async show(req, res) {
    try {
      const admin = await Admin.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).json({
        admin: admin,
      });
    } catch (error) {
      Logger.game("error", "AlbumsController.show -> ERROR: " + error);
      return res.status(500).json({
        message: "Erro ao tentar carregar album",
      });
    }
  }

  async store(req, res) {
    try {
      if (!(await AdminSchema)) {
        return res.status(400).json({
          message: "Dados inválidos",
        });
      }
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const admin = await Admin.create(req.body);
      admin.password = undefined;
      return res.status(200).json({
        message: "Administrador Cadastrado com sucesso",
        admin: admin,
      });
    } catch (error) {
      Logger.admin("error", "AlbumsController.store -> ERROR: " + error);
      return res.status(500).json({
        message: "Erro ao tentar salvar administrador",
      });
    }
  }

  async update(req, res) {
    try {
      if (!(await AdminSchema)) {
        return res.status(400).json({
          message: "Dados inválidos",
        });
      }
      const admin = await Admin.update(req.body);
      return res.status(201).json({
        message: "Figurinha salva com sucesso",
        admin: admin,
      });
    } catch (error) {
      Logger.game("error", "AlbumsController.update -> ERROR: " + error);
      return res.status(500).json({
        message: "Erro ao tentar atualizar administrador",
      });
    }
  }

  async changePassword(req, res) {
    try {
      await Admin.update(
        { password: bcrypt.hash(req.body.password, 10) },
        {
          where: { id: req.body.user_id },
        }
      );
      if (req.body.origin === "recovery") {
        await PlayersToken.destroy({
          where: { player_id: req.body.player_id },
        });
      }
      return res.status(200).json({ message: "OK" });
    } catch (error) {
      Logger.game("error", "AdminsController.changePassword -> ERROR: " + error);
      return res.status(400).json({
        message: "Erro ao tentar atualizar senha",
      });
    }
  }
}
}

module.exports = new AdminsController();
