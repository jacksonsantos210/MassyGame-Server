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
    //this.belongsTo(models.Figure, { foreingKey: "type_id", as: "figure" });
    this.hasOne(models.Figure, { foreingKey: "type_id", as: "type" });
  }
}

module.exports = FiguresType;
