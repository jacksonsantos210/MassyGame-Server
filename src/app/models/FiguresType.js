const { Model, DataTypes } = require("sequelize");

class FiguresType extends Model {
  static init(sequelize) {
    console.log("APP-> Model: FiguresType, has been initialized");
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
