import express from 'express';
import GameController from './controllers/GameController';
import GameDetailsController from './controllers/GameDetailsController';

import FeedController from './controllers/FeedController';

const routes = express.Router();

const gameController = new GameController();
const gameDetailsController = new GameDetailsController();

const feedController = new FeedController();

routes.get('/api/v1/games', gameController.index);
routes.get('/api/v1/games/details/:id', gameDetailsController.get);

routes.get('/api/v1/feeds', feedController.index);

export default routes;
