const { ProductCategory } = require("../database/models");

exports.create = async (req, res) => {
	const { name, description, barcode } = req.body;

	console.log("barcode", barcode);
	if (!name || !barcode) {
		return res.status(401).json({
			status: "request failed",
			message: "category name and barcode are required",
		});
	}
	try {
		const category = await ProductCategory.create({
			name,
			barcode: `${barcode}`,
			description,
		});
		res.status(201).json({
			status: "success",
			data: category,
		});
	} catch (err) {
		console.log(err);
		if (err.name === "SequelizeUniqueConstraintError") {
			res.status(400).json({
				status: "Bad Request",
				message: "Category with this name already exists.",
			});
		} else {
			console.error(err);
			res.status(500).json({
				status: "Internal Server Error",
				message: "Error creating product.",
			});
		}
	}
};

exports.getAll = async (req, res) => {
	try {
		const categories = await ProductCategory.findAll();
		res.status(200).json({
			status: "success",
			data: categories,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "error getting categories",
			status: "error getting categories",
		});
	}
};

exports.getOne = async (req, res) => {
	const { catId } = req.params;
	if (!catId) {
		return res.status(400).json({
			status: "Failed",
			message: "Category Id is required",
		});
	}
	try {
		const category = await ProductCategory.findOne({ where: { id: catId } });
		if (!category) {
			return res.status(404).json({
				status: "Request failed",
				message: "category not found",
			});
		}
		return res.status(200).json({
			status: "success",
			data: category,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "error getting category",
			status: "error getting category",
		});
	}
};
exports.update = async (req, res) => {
	const { catId } = req.body;
	if (!catId) {
		return res.status(401).json({
			status: "failed",
			message: "prodId is required",
		});
	}
	try {
		const category = await ProductCategory.findOne({
			where: { id: catId },
		});
		if (!category) {
			return res.status(404).json({
				status: "failed",
				message: "category not found",
			});
		}
		await ProductCategory.update({ ...req.body }, { where: { id: catId } });

		res.status(203).json({
			status: "success",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "error updating category",
			status: "error updating category",
		});
	}
};
exports.deleteOne = async (req, res) => {
	const { catId } = req.body;
	if (!catId) {
		return res.status(401).json({
			status: "failed",
			message: "catId is required",
		});
	}
	try {
		const category = await ProductCategory.destroy({
			where: { id: catId },
		});
		if (!category) {
			return res.status(404).json({
				status: "failed",
				message: "category not found",
			});
		}

		res.status(204).json({
			status: "success",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "error deleting category",
			status: "error deleting category",
		});
	}
};
exports.deleteAll = async (req, res) => {
	try {
		await ProductCategory.truncate();
		res.status(204).json({
			status: "success",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "error deleting categories",
			status: "error deleting categories",
		});
	}
};
