const { Model, DataTypes } = require("sequelize");

class Premier extends Model {
  static init(sequelize) {
    super.init(
      {
        date: DataTypes.DATEONLY,
        player_id: DataTypes.INTEGER,
        hash: DataTypes.STRING,
        figure_id: DataTypes.INTEGER,
        opened: DataTypes.BOOLEAN,
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

module.exports = Premier;
