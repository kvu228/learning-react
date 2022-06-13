import express from "express";

import {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
} from "../controllers/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

//@desc     Auth user & get token
//@route    POST /api/user/login
//@access   Public
router.route("/").post(registerUser).get(protect, isAdmin, getUsers);
router.post("/login", authUser);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router.route("/:id").delete(protect, isAdmin, deleteUser);
export default router;
