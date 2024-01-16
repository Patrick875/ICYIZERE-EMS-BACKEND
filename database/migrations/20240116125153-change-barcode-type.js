"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn("productcategories", "barcode", {
			type: Sequelize.STRING,
			allowNull: true, // Set to true or false based on your requirements
		});
	},

	down: async (queryInterface, Sequelize) => {
		// Revert the changes by setting the type back to BIGINT:
		await queryInterface.changeColumn("productcategories", "barcode", {
			type: Sequelize.BIGINT,
			allowNull: true, // Set to true or false based on your requirements
		});
	},
};
