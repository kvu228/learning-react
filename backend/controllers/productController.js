import expressAsyncHandler from "express-async-handler";
import Product from "../model/productModel.js";

//Fetch all products
//@route    GET /api/prodtucts
//@access   Public
const getProducts = expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

//Fetch single product
//@route    GET /api/prodtuct/:id
//@access   Public
const getProductByID = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

export { getProductByID, getProducts };
