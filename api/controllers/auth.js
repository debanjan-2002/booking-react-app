import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
    const { username, password, email } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(200).json(newUser);
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect)
            return next(createError(400, "Wrong credentials!"));

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET
        );

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(otherDetails);
    } catch (err) {
        next(err);
    }
};
