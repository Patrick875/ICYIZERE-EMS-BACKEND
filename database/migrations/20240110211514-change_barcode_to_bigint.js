"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn("productcategories", "barcode", {
			type: Sequelize.BIGINT,
			allowNull: false, // Modify this based on your requirements
		});
	},

	down: async (queryInterface, Sequelize) => {
		// If needed, you can revert the changes in the down migration
		await queryInterface.changeColumn("productcategories", "barcode", {
			type: Sequelize.INTEGER,
			allowNull: true, // Modify this based on your requirements
		});
	},
};
