const { Model, DataTypes } = require("sequelize");

class Log extends Model {
  static init(sequelize) {
    console.log("APP-> Model: Log, has been initialized");
    super.init(
      {
        action: DataTypes.STRING,
        information: DataTypes.STRING,
        level: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Log;
