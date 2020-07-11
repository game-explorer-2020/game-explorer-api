import { Game } from './../models/Game';
import { Request, Response } from 'express';

import api from '../configs/api';
import QueryBuilder from '../lib/QueryBuilder';

class GameController {
  async index(request: Request, response: Response) {
    const { term = '', offset = 0 } = request.query;
    const query = new QueryBuilder()
      .select('name', 'popularity', 'genres.name', 'cover.url')
      .search(String(term))
      .offset(Number(offset))
      .sort('popularity')
      .build();

    const apiResponse = await api.post('/games', query);

    const games: Game[] = apiResponse.data.map((game: any) => ({
      id: game.id,
      name: game.name,
      coverUrl: game.cover?.url || `${request.get('host')}/images/no-image.svg`,
      popularity: game.popularity,
      genres: game.genres?.map((genre: any) => genre.name) || []
    }));

    return response.json(games);
  }
}

export default GameController;
