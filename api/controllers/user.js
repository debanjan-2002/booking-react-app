import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { ...req.body },
            { runValidators: true, new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json("User has been deleted!");
    } catch (err) {
        next(err);
    }
};

export const getUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};
