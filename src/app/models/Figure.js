const { Model, DataTypes } = require("sequelize");

class Figure extends Model {
  static init(sequelize) {
    console.log("APP-> Model: Figure, has been initialized");
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

  /*  static associateAlbum(model) {
    this.hasMany(model, { foreingKey: "figures_id", as: "albums" });
  } */
}

module.exports = Figure;
