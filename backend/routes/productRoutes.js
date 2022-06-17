import express from "express";

import {
    getProducts,
    getProductByID,
    deleteProductByID,
    createProduct,
    updateProduct,
    createProductReview,
} from "../controllers/productController.js";

import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

//Fetch all products
//@route    GET /api/prodtucts
//@access   Public
router.route("/").get(getProducts).post(protect, isAdmin, createProduct);
router.route("/:id/reviews").post(protect, createProductReview);

//Fetch single product
//@route    GET /api/prodtuct/:id
//@access   Public
router
    .route("/:id")
    .get(getProductByID)
    .delete(protect, isAdmin, deleteProductByID)
    .put(protect, isAdmin, updateProduct);

export default router;
