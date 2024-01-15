"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class ProductCategory extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Product, { foreignKey: "category" });
		}
	}
	ProductCategory.init(
		{
			name: {
				type: DataTypes.STRING,
				unique: [true, "Category with name already exists"],
			},
			description: DataTypes.STRING,
			barcode: DataTypes.BIGINT,
		},
		{
			sequelize,
			modelName: "ProductCategory",
			tableName: "productcategories",
			timestamps: true,
		}
	);
	return ProductCategory;
};
