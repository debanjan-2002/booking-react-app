import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {
    const { hotelId } = req.params;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        const hotel = await Hotel.findById(hotelId);
        hotel.rooms.push(savedRoom._id);
        await hotel.save();

        res.status(200).json(savedRoom);
    } catch (err) {
        next(err);
    }
};

export const updateRoom = async (req, res, next) => {
    const { id } = req.params;
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            id,
            { ...req.body },
            { runValidators: true, new: true }
        );
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
};

export const deleteRoom = async (req, res, next) => {
    const { id, hotelId } = req.params;
    try {
        await Room.findByIdAndDelete(id);
        await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: id } });

        res.status(200).json("Room has been deleted!");
    } catch (err) {
        next(err);
    }
};

export const getRoom = async (req, res, next) => {
    const { id } = req.params;
    try {
        const room = await Room.findById(id);
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
};

export const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
};
