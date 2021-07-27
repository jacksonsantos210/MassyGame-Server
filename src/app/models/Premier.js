const { Model, DataTypes } = require("sequelize");

class Premier extends Model {
  static init(sequelize) {
    console.log("APP-> Model: Premier, has been initialized");
    super.init(
      {
        date: DataTypes.DATE,
        player_id: DataTypes.INTEGER,
        hash: DataTypes.STRING,
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
