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
            console.log(error);
            res.status(401);
            throw new Error("Token fail!");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("No token found");
    }
});

export { protect };
