import { GameIGDB } from './../models/igdb/GameIGDB';
import { Request, Response } from 'express';

import { Game } from './../models/Game';
import GameMapper from '../mappers/GameMapper';
import GameSchema from '../schemas/GameSchema';

import igdbApi from '../configs/igdb-api';
import QueryBuilder from '../lib/QueryBuilder';

class GameController {
  async index(request: Request, response: Response) {
    const { term = '', offset = 0 } = request.query;
    const query = new QueryBuilder()
      .select('name', 'genres.name', 'platforms.name', 'cover.url')
      .search(String(term))
      .offset(Number(offset))
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
}

export default GameController;
