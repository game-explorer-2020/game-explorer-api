import express from 'express';
import { Request, Response } from 'express';
import GameController from './controllers/GameController';

const routes = express.Router();

const gameController = new GameController();

routes.post('/games', gameController.index);

export default routes;
