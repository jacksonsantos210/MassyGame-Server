const { Model, DataTypes } = require("sequelize");

class Figure extends Model {
  static init(sequelize) {
    console.log("APP-> Model: Figure, has been initialized");
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        coin: DataTypes.INTEGER,
        type: DataTypes.INTEGER,
        image: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Album, { foreingKey: "figure_id", as: "albums" });
    this.hasMany(models.Stand, { foreingKey: "figure_id", as: "stands" });
  }
}

module.exports = Figure;
