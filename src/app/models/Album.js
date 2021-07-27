const { Model, DataTypes } = require("sequelize");
class Album extends Model {
  static init(sequelize) {
    console.log("APP-> Model: Album, has been initialized");
    super.init(
      {
        player_id: DataTypes.INTEGER,
        figure_id: DataTypes.INTEGER,
        origin: DataTypes.STRING,
        pasted: DataTypes.BOOLEAN,
        sale: DataTypes.BOOLEAN,
        sale_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Player, { foreingKey: "player_id", as: "player" });
    this.belongsTo(models.Figure, { foreingKey: "figure_id", as: "figure" });
  }
}

module.exports = Album;
