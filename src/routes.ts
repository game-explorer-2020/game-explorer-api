import express from 'express';

import GameController from './controllers/GameController';
import GameDetailsController from './controllers/GameDetailsController';
import FeedController from './controllers/FeedController';

const routes = express.Router();

const gameController = new GameController();
const gameDetailsController = new GameDetailsController();
const feedController = new FeedController();

// Games
routes.get('/api/v1/games', gameController.index.bind(gameController));
routes.get('/api/v1/games/favorites', gameController.getFavorites.bind(gameController));
routes.put('/api/v1/games/favorites/:id', gameController.toggleFavorite.bind(gameController));

// Game details
routes.get('/api/v1/games/details/:id', gameDetailsController.get.bind(gameDetailsController));

// Feeds
routes.get('/api/v1/feeds', feedController.index.bind(feedController));
routes.get('/api/v1/feeds/favorites', feedController.getFavorites.bind(feedController));
routes.put('/api/v1/feeds/favorites/:id', feedController.toggleFavorite.bind(feedController));

export default routes;
