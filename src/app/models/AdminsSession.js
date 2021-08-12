const { Model, DataTypes } = require("sequelize");

class AdminsSession extends Model {
  static init(sequelize) {
    super.init(
      {
        admin_id: DataTypes.INTEGER,
        token: DataTypes.STRING,
        ip_address: DataTypes.STRING,
        user_agent: DataTypes.STRING,
        payload: DataTypes.STRING,
        logged: DataTypes.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = AdminsSession;
