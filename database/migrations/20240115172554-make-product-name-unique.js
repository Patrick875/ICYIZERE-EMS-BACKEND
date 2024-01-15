"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addConstraint("products", {
			fields: ["name"],
			type: "unique",
			name: "unique_product_name_constraint",
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeConstraint(
			"products",
			"unique_product_name_constraint"
		);
	},
};
