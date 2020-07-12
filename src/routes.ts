import express from 'express';
import GameController from './controllers/GameController';
import GameDetailsController from './controllers/GameDetailsController';

import FeedController from './controllers/FeedController';
import FeedDetailsController from './controllers/FeedDetailsController';

const routes = express.Router();

const gameController = new GameController();
const gameDetailsController = new GameDetailsController();

const feedController = new FeedController();
const feedDetailsController = new FeedDetailsController();

routes.get('/api/v1/games', gameController.index);
routes.get('/api/v1/games/details/:id', gameDetailsController.get);

routes.get('/api/v1/feeds', feedController.index);
routes.get('/api/v1/feeds/details/:id', feedDetailsController.get);

export default routes;
