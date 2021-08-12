const { Model, DataTypes } = require("sequelize");

class FiguresType extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        percentage: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = FiguresType;
