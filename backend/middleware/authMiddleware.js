import jsonwebtoken from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../model/userModel.js";

const protect = expressAsyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Token fail!");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("No token found!");
    }
});

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        {
            res.status(401);
            throw new Error("Invalid Authorization");
        }
    }
};

export { protect, isAdmin };
