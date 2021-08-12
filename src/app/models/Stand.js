const { Model, DataTypes } = require("sequelize");

class Stand extends Model {
  static init(sequelize) {
    super.init(
      {
        seller: DataTypes.INTEGER,
        figure_id: DataTypes.INTEGER,
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
    this.belongsTo(models.Figure, { foreingKey: "figure_id", as: "figure" });
  }
}

module.exports = Stand;
