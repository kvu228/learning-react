import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// import products from "./data/products.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
    res.send("API is running with Nodemon");
});

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Server is running ${process.env.NODE_ENV} on port ${PORT}`),
);
