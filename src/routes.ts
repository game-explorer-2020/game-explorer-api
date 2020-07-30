import express from 'express';
import GameController from './controllers/GameController';
import GameDetailsController from './controllers/GameDetailsController';
import FavoriteGameController from './controllers/FavoriteGameController';

import FeedController from './controllers/FeedController';
import FavoriteFeedController from './controllers/FavoriteFeedController';

const routes = express.Router();

const gameController = new GameController();
const favoriteGameController = new FavoriteGameController();

const gameDetailsController = new GameDetailsController();

const feedController = new FeedController();
const favoriteFeedController = new FavoriteFeedController();

// Games
routes.get('/api/v1/games', gameController.index);

// Favorite games
routes.get('/api/v1/games/favorites', favoriteGameController.index);
routes.put('/api/v1/games/favorites/:id', favoriteGameController.store);

// Game details
routes.get('/api/v1/games/details/:id', gameDetailsController.get);

// Feeds
routes.get('/api/v1/feeds', feedController.index);

// Favorite feeds
routes.get('/api/v1/feeds/favorites', favoriteFeedController.index);
routes.put('/api/v1/feeds/favorites/:id', favoriteFeedController.store);

export default routes;
