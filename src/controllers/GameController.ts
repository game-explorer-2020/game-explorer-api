import { Request, Response } from 'express';

import { Game } from './../models/Game';
import GameMapper from '../mappers/GameMapper';
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
      const igdbApiResponse = await igdbApi.post('/games', query);
      const games: Game[] = igdbApiResponse.data.map((game: any) => GameMapper.from(game));

      return response.json(games);
    } catch (error) {
      return response.status(error.response.status).send(error.response.data);
    }
  }
}

export default GameController;
