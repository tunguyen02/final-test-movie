import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const UserRouter = Router();

UserRouter.post('/register', userController.register);
UserRouter.post('/login', userController.login);
UserRouter.post('/logout', authMiddleware, userController.logout);

export default UserRouter;