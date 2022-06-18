import expressAsyncHandler from "express-async-handler";
import Product from "../model/productModel.js";

//@desc     Fetch all products
//@route    GET /api/prodtucts
//@access   Public
const getProducts = expressAsyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.q
        ? {
              name: {
                  $regex: req.query.q,
                  $options: "i",
              },
          }
        : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count - pageSize) });
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

//@desc     Create new review
//@route    POST /api/prodtucts/:id/reviews
//@access   Private
const createProductReview = expressAsyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.review.find(
            (r) => r.user.toString() === req.user._id.toString()
        );
        if (alreadyReviewed) {
            res.status(400);
            throw new Error("You have already reviewed this product");
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.review.push(review);

        product.numReviews = product.review.length;

        product.rating =
            product.review.reduce((acc, item) => item.rating + acc, 0) /
            product.review.length;
        await product.save();
        res.status(201).json({ message: "Review added" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
});

//@desc     Get top rated products
//@route    GET /api/prodtucts/top
//@access   Public
const getTopProducts = expressAsyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.json(products);
});

export {
    getProductByID,
    getProducts,
    deleteProductByID,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts,
};
