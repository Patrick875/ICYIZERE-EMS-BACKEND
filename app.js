const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/productcategory");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
// app.use(cors({ origin: "https://genuine-sherbet-92acf5.netlify.app/" }));
app.use(cors());
app.options("*", cors());

app.use("/api/v1/", userRouter);
app.use("/api/v1/products/", productRouter);
app.use("/api/v1/categories/", categoryRouter);

module.exports = app;
