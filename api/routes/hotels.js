import express from "express";
import {
    createHotel,
    deleteHotel,
    getAllHotels,
    getHotel,
    updateHotel
} from "../controllers/hotel.js";

const router = express.Router();

router.route("/").get(getAllHotels).post(createHotel);

router.route("/:id").get(getHotel).put(updateHotel).delete(deleteHotel);

export default router;
