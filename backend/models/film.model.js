import mongoose from "mongoose";

const filmSchema = new mongoose.Schema({
    ID: Number,
    name: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    introduce: {
        type: String,
        required: true
    },
})

const FilmModel = mongoose.model('Film', filmSchema);
export default FilmModel;