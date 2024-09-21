import { Router } from 'express';
import multer from 'multer';
import filmController from '../controllers/film.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + '-' + file.originalname);
        }
    })
});

const FilmRouter = Router();

FilmRouter.post('/', authMiddleware, filmController.createFilm);
FilmRouter.get('/', filmController.getAllFilms);
FilmRouter.patch('/:id', authMiddleware, upload.single('image'), filmController.updateFilm);
FilmRouter.delete('/:id', authMiddleware, filmController.deleteFilm);
FilmRouter.get('/sort', filmController.getFilms);

export default FilmRouter;