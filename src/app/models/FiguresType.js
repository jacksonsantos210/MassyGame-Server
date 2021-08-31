const { Model, DataTypes } = require("sequelize");

class FiguresType extends Model {
  static init(sequelize) {
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

  static associate(models) {
    this.belongsTo(models.Figure, { foreingKey: "type", as: "figure" });
  }
}

module.exports = FiguresType;
