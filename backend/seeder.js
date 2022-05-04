import mongoose from "mongoose";
import dotenv from "dotenv";

import users from "./data/users.js";
import products from "./data/products.js";

import User from "./model/userModel.js";
import Product from "./model/productModel.js";
import Order from "./model/orderModel.js";

import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createUsers = await User.insertMany(users);
        const adminUser = createUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return {
                ...product,
                user: adminUser,
            };
        });

        await Product.insertMany(sampleProducts);

        console.log("Data imported!");
        process.exit();
    } catch (error) {
        console.error(`Import data has error:${error}`);
        process.exit(1);
    }
};

const detroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data destroyed!");
        process.exit();
    } catch (error) {
        console.error(`Destroy data has error:${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    detroyData();
} else {
    importData();
}
