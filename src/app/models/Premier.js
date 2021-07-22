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
}

module.exports = Premier;
