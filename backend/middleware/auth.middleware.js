const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

const checkUserAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith("Bearer")) {
        try {
            // Get token from header
            token = authorization.split(" ")[1];

            // Verify Token

            const { id } = jwt.verify(token, JWT_KEY);

            console.log(id)

            req.user = await User.findOne({ id: id }).select("-password");

            if (!req.user) {
                return res.status(400).json({ success: false, message: "User not found" });
            }

            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ success: false, message: "Unauthorized user" });
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: "Token is required" });
    }
};

module.exports = { checkUserAuth };