const { Model, DataTypes } = require("sequelize");

class Premier extends Model {
  static init(sequelize) {
    super.init(
      {
        date: DataTypes.DATEONLY,
        player_id: DataTypes.INTEGER,
        hash: DataTypes.STRING,
        figure1_id: DataTypes.INTEGER,
        figure2_id: DataTypes.INTEGER,
        figure3_id: DataTypes.INTEGER,
        opened: DataTypes.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Player, { foreingKey: "player_id", as: "player" });
  }
}

module.exports = Premier;
