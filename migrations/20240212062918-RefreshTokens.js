'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("RefreshTokens", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      token: Sequelize.STRING(16000)
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("RefreshTokens");
  }
};
