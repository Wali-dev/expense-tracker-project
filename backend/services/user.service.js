
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { User } = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports.createUserService = async (userData) => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        return {
            success: false,
            message: 'Email already exists'
        }
    }
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = new User({
            id: uuidv4(),
            firstName: userData.firstname,
            lastName: userData.lastname,
            email: userData.email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        return {
            success: true,
            data: savedUser,
            message: 'User created successfully'
        };
    } catch (error) {

        return {
            success: false,
            message: error.message
        };

    }
}


const JWT_KEY = process.env.JWT_KEY;

module.exports.handleSignIn = async (identifier, password) => {
    try {
        if (identifier && password) {
            const user = await User.findOne({ email: identifier });

            if (!user) {
                return {
                    success: false,
                    message: "No user exists with this identifier"
                };
            } else {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    const accessToken = jwt.sign({ id: user.id, email: user.email }, JWT_KEY, { expiresIn: '1d' });

                    return {
                        success: true,
                        data: { accessToken },
                        message: 'Login successful'
                    };
                } else {
                    return {
                        success: false,
                        message: "Password does not match"
                    };
                }
            }
        } else {
            return {
                success: false,
                message: "Identifier and password are required"
            };
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "An error occurred during login"
        };
    }
};
module.exports.getProfile = async (id) => {
    try {
        const user = await User.findOne({ id });

        if (!user) {
            return {
                success: false,
                message: "User not found"
            };
        }

        return {
            success: true,
            data: user,
            message: "User retrieved successfully"
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
};

module.exports.handleSignOut = (res) => {
    try {
        res.clearCookie("accessToken", {
            sameSite: "none",
            secure: true,
            path: "/"
        })
            .status(200)
            .send({
                success: true,
                message: "User has been logged out."
            });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "An error occurred during logout"
        });
    }
};
