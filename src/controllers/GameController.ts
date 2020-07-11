import { Game } from './../models/Game';
import { Request, Response } from 'express';

import igdbApi from '../configs/igdb-api';
import QueryBuilder from '../lib/QueryBuilder';

class GameController {
  async index(request: Request, response: Response) {
    const { term = '', offset = 0 } = request.query;
    const query = new QueryBuilder()
      .select('name', 'popularity', 'genres.name', 'platforms.name', 'cover.url')
      .search(String(term))
      .offset(Number(offset))
      .sort('popularity')
      .build();

    try {
      const igdbApiResponse = await igdbApi.post('/games', query);
      const games: Game[] = igdbApiResponse.data.map((game: any) => ({
        id: game.id,
        name: game.name,
        coverUrl: game.cover?.url || `${request.get('host')}/images/no-image.svg`,
        popularity: game.popularity,
        genres: game.genres?.map((genre: any) => genre.name) || [],
        platforms: game.platforms?.map((platform: any) => platform.name) || []
      }));

      return response.json(games);
    } catch (error) {
      return response.status(error.response.status).send(error.response.data);
    }
  }
}

export default GameController;
