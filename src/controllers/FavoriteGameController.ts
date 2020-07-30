import { Request, Response } from 'express';

import GameSchema from '../schemas/GameSchema';
import QueryBuilder from '../lib/QueryBuilder';
import igdbApi from '../configs/igdb-api';
import { GameIGDB } from '../models/igdb/GameIGDB';
import { Game } from '../models/Game';
import GameMapper from '../mappers/GameMapper';

class FavoriteGameController {
  async index(request: Request, response: Response) {
    const { offset = 0 } = request.query;
    const favoriteGames = await GameSchema.find();
    const query = new QueryBuilder()
      .select('name', 'genres.name', 'platforms.name', 'cover.url')
      .where(`id = (${favoriteGames.map(g => g.id)})`)
      .offset(Number(offset))
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

  async store(request: Request, response: Response) {
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

export default FavoriteGameController;
