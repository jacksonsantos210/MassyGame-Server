const { Model, DataTypes } = require("sequelize");

class Admin extends Model {
  static init(sequelize) {
    console.log("APP-> Model: Admin, has been initialized");
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Admin;
