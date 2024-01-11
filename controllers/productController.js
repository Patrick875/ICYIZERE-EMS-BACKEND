const { Product, ProductCategory } = require("../database/models");

exports.create = async (req, res) => {
	const { name, description, category } = req.body;
	if (!name || !category) {
		return res.status(401).json({
			status: "failed",
			message: "name and category are required",
		});
	}

	try {
		const product = await Product.create({ name, category, description });

		return res.status(201).json({
			data: product,
			status: "success",
			message: "product registered",
		});
	} catch (error) {
		console.log({ error });
		return res.status(400).json({
			status: "failed",
			message: "error registering product",
		});
	}
};

exports.getAll = async (req, res) => {
	try {
		const products = await Product.findAll({
			include: [{ model: ProductCategory }],
		});
		res.status(200).json({
			status: "success",
			data: products,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "error getting products",
			status: "error getting products",
		});
	}
};

exports.getOne = async (req, res) => {
	const { prodId } = req.params;
	if (!prodId) {
		return res.status(400).json({
			status: "Failed",
			message: "Product Id is required",
		});
	}
	try {
		const product = await Product.findOne({ where: { id: prodId } });
		if (!product) {
			return res.status(404).json({
				status: "Request failed",
				message: "product not found",
			});
		}
		return res.status(200).json({
			status: "success",
			data: product,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "error getting product",
			status: "error getting product",
		});
	}
};

exports.update = async (req, res) => {
	const { prodId } = req.body;
	if (!prodId) {
		return res.status(401).json({
			status: "failed",
			message: "prodId is required",
		});
	}
	try {
		const product = await Product.findOne({
			where: { id: prodId },
			include: [{ model: ProductCategory }],
		});
		if (!product) {
			return res.status(404).json({
				status: "failed",
				message: "product not found",
			});
		}
		await Product.update({ ...req.body }, { where: { id: prodId } });

		res.status(203).json({
			status: "success",
			data: product,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "error getting products",
			status: "error getting products",
		});
	}
};
exports.deleteOne = async (req, res) => {
	const { prodId } = req.body;
	if (!prodId) {
		return res.status(401).json({
			status: "failed",
			message: "prodId is required",
		});
	}
	try {
		await Product.destroy({
			where: { id: prodId },
		});

		res.status(204).json({
			status: "success",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "error getting products",
			status: "error getting products",
		});
	}
};
exports.deleteAll = async (req, res) => {
	try {
		await Product.truncate();
		res.status(204).json({
			status: "success",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "error deleting products",
			status: "error deleting products",
		});
	}
};
