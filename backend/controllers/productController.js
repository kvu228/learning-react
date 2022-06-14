import expressAsyncHandler from "express-async-handler";
import Product from "../model/productModel.js";

//@desc     Fetch all products
//@route    GET /api/prodtucts
//@access   Public
const getProducts = expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

//@desc     Fetch single product
//@route    GET /api/prodtucts/:id
//@access   Public
const getProductByID = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

//@desc     Delete a product
//@route    DELETE /api/prodtucts/:id
//@access   Private/Admin
const deleteProductByID = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: "Product deleted" });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

//@desc     Create a product
//@route    POST /api/prodtucts/
//@access   Private/Admin
const createProduct = expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: "Sample name",
        price: 0,
        user: req.user._id,
        image: "https://picsum.photos/480/380",
        brand: "Sample brand",
        category: "Sample category",
        countInStock: 0,
        numReviews: 0,
        description: "Sample description",
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

//@desc     Update a product
//@route    PUT /api/prodtucts/
//@access   Private/Admin
const updateProduct = expressAsyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } =
        req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
    } else {
        res.status(404);
        throw new Error("Product not found");
    }

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
});

export {
    getProductByID,
    getProducts,
    deleteProductByID,
    createProduct,
    updateProduct,
};
