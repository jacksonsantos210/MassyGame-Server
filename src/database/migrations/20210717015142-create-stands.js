"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("stands", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      seller: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "players",
          key: "id",
        },
      },

      figure_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "figures",
          key: "id",
        },
      },
      sold: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      sold_when: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "players",
          key: "id",
        },
      },
      sold_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("stands");
  },
};
