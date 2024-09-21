import FilmModel from '../models/film.model.js';

const filmController = {

    getAllFilms: async (req, res) => {
        try {
            const films = await FilmModel.find();
            res.status(200).json(films);
        } catch (error) {
            res.status(500).json({
                message: 'Error retrieving films',
                error
            });
        }
    },

    createFilm: async (req, res) => {
        try {
            const newFilm = new FilmModel(req.body);
            const savedFilm = await newFilm.save();
            res.status(201).json(savedFilm);
        } catch (error) {
            res.status(500).json({
                message: 'Error creating film',
                error
            });
        }
    },

    updateFilm: async (req, res) => {
        const { id } = req.params;
        const { name, time, year, introduce } = req.body;
        const image = req.file ? req.file.path : null;

        try {
            const film = await FilmModel.findById(id);
            if (!film) {
                return res.status(404).json({
                    message: 'Film not found'
                });
            }
            if (image && film.image) {
                fs.unlinkSync(film.image);
            }

            film.name = name || film.name;
            film.time = time || film.time;
            film.year = year || film.year;
            film.introduce = introduce || film.introduce;
            film.image = image || film.image;

            await film.save();

            res.status(200).json({
                message: 'Film updated successfully',
                film
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error updating film',
                error
            });
        }
    },

    deleteFilm: async (req, res) => {
        try {
            const deletedFilm = await FilmModel.findByIdAndDelete(req.params.id);
            if (!deletedFilm) {
                return res.status(404).json({ message: 'Film not found' });
            }
            res.status(200).json({
                message: 'Film deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error deleting film',
                error
            });
        }
    },

    searchFilms: async (req, res) => {
        const { keyword } = req.query;

        try {
            const films = await FilmModel.find({
                name: { $regex: keyword, $options: 'i' }
            });
            if (films.length > 0) {
                res.status(200).json(films);
            } else {
                res.status(404).json({
                    message: 'No films found'
                });
            }
        } catch (error) {
            res.status(500).json({
                message: 'Error searching films',
                error
            });
        }
    },

    getFilms: async (req, res) => {
        const { sort } = req.query;
        try {
            let sortOption = {};
            if (sort === 'asc') {
                sortOption = { year: 1 };
            } else if (sort === 'desc') {
                sortOption = { year: -1 };
            }
            const films = await FilmModel.find().sort(sortOption);
            res.status(200).json(films);
        } catch (error) {
            res.status(500).json({
                message: 'Error retrieving films',
                error
            });
        }
    }
}

export default filmController;