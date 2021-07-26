const { Model, DataTypes } = require("sequelize");

class Stand extends Model {
  static init(sequelize) {
    console.log("APP-> Model: Figure, has been initialized");
    super.init(
      {
        player_id: DataTypes.INTEGER,
        figure_id: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        sold: DataTypes.BOOLEAN,
        sold_when: DataTypes.INTEGER,
        sold_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Album, { foreingKey: "figure_id", as: "albums" });
  }
}

module.exports = Stand;
