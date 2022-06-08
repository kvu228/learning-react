import express from "express";

import {
    getProducts,
    getProductByID,
} from "../controllers/productController.js";

const router = express.Router();

//Fetch all products
//@route    GET /api/prodtucts
//@access   Public
router.route("/").get(getProducts);

//Fetch single product
//@route    GET /api/prodtuct/:id
//@access   Public
router.route("/:id").get(getProductByID);

export default router;
