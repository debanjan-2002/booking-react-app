import express from "express";
import {
    createRoom,
    deleteRoom,
    getAllRooms,
    getRoom,
    updateRoom
} from "../controllers/room.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.route("/").get(getAllRooms);

router.route("/:hotelId").post(verifyToken, verifyAdmin, createRoom);

router.route("/:id").get(getRoom).put(verifyToken, verifyAdmin, updateRoom);

router.route("/:hotelId/:id").delete(verifyToken, verifyAdmin, deleteRoom);

export default router;
