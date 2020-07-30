import { Request, Response } from 'express';

import { GameIGDB } from './../models/igdb/GameIGDB';
import { Game } from './../models/Game';

import GameMapper from '../mappers/GameMapper';
import GameSchema from '../schemas/GameSchema';

import igdbApi from '../configs/igdb-api';
import QueryBuilder from '../lib/QueryBuilder';

class GameController {
  private fields = ['name', 'genres.name', 'platforms.name', 'cover.url'];

  async index(request: Request, response: Response) {
    const { term = '', page = 0 } = request.query;
    const query = new QueryBuilder()
      .select(...this.fields)
      .where(`name ~ *"${term}"*`)
      .page(Number(page))
      .sort('popularity')
      .build();

    try {
      const igdbApiResponse = await igdbApi.post<GameIGDB[]>('/games', query);
      const games: Game[] = igdbApiResponse.data.map(game => GameMapper.from(game));
      const favoriteGames = await GameSchema.find()
        .where('id')
        .in(games.map(g => g.id));
      const favoritableGames = games.map(game => ({
        ...game,
        favorite: favoriteGames.some(g => g.id === game.id)
      }));

      return response.json(favoritableGames);
    } catch (error) {
      return response.status(error.response.status).send(error.response.data);
    }
  }

  async getFavorites(request: Request, response: Response) {
    const { term = '', page = 0 } = request.query;
    const favoriteGames = await GameSchema.find();

    if (!favoriteGames.length) {
      return response.json([]);
    }

    const query = new QueryBuilder()
      .select(...this.fields)
      .where(`id = (${favoriteGames.map(g => g.id)}) & name ~ *"${term}"*`)
      .page(Number(page))
      .sort('popularity')
      .build();

    try {
      const igdbApiResponse = await igdbApi.post<GameIGDB[]>('/games', query);
      const games: Game[] = igdbApiResponse.data.map(game => ({ ...GameMapper.from(game), favorite: true }));

      return response.json(games);
    } catch (error) {
      return response.status(error.response.status).send(error.response.data);
    }
  }

  async toggleFavorite(request: Request, response: Response) {
    const { id } = request.params;

    const favoriteGame = await GameSchema.findOne({ id: Number(id) });

    if (favoriteGame) {
      await favoriteGame.remove();
      return response.status(200).json({ message: 'The game is now unfavorited.' });
    }

    await GameSchema.create({ id: Number(id) });
    return response.status(200).json({ message: 'The game is now favorited.' });
  }
}

export default GameController;
