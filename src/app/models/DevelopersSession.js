const { Model, DataTypes } = require("sequelize");

class DevelopersSession extends Model {
  static init(sequelize) {
    super.init(
      {
        developer_id: DataTypes.INTEGER,
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

module.exports = DevelopersSession;
