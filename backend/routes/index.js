import { Router } from "express";
import UserRouter from "./user.router.js";
import FilmRouter from "./film.router.js";

const RootRouterV1 = Router();

RootRouterV1.use('/users', UserRouter);
RootRouterV1.use('/films', FilmRouter);

export default RootRouterV1;