const { Model, DataTypes } = require("sequelize");

class Figure extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        coin: DataTypes.INTEGER,
        especial: DataTypes.BOOLEAN,
        image: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Figure;
