import express from "express";
import {
    createHotel,
    deleteHotel,
    getAllHotels,
    getHotel,
    updateHotel
} from "../controllers/hotel.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.route("/").get(getAllHotels).post(verifyToken, verifyAdmin, createHotel);

router
    .route("/:id")
    .get(getHotel)
    .put(verifyToken, verifyAdmin, updateHotel)
    .delete(verifyToken, verifyAdmin, deleteHotel);

export default router;
