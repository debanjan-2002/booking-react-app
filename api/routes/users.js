import express from "express";
import {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {});
// router.get("/checkuser/:id", verifyToken, verifyUser, (req, res, next) => {
//     res.send("You are authorized to delete your account!");
// });

router.route("/").get(verifyToken, verifyAdmin, getAllUsers);

router
    .route("/:id")
    .get(verifyToken, verifyUser, getUser)
    .put(verifyToken, verifyUser, updateUser)
    .delete(verifyToken, verifyUser, deleteUser);

export default router;
