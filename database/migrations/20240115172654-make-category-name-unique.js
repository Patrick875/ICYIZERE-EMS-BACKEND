"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addConstraint("productcategories", {
			fields: ["name"],
			type: "unique",
			name: "unique_category_name_constraint",
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeConstraint(
			"productcategories",
			"unique_category_name_constraint"
		);
	},
};
