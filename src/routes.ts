import express from 'express';
import GameController from './controllers/GameController';
import GameDetailsController from './controllers/GameDetailsController';

const routes = express.Router();

const gameController = new GameController();
const gameDetailsController = new GameDetailsController();

routes.get('/api/v1/games', gameController.index);
routes.get('/api/v1/games/details/:id', gameDetailsController.find);

export default routes;
