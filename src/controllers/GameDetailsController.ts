import { GameDetails } from './../models/GameDetails';
import { Request, Response } from 'express';

import GameDetailsMapper from '../mappers/GameDetailsMapper';
import igdbApi from '../configs/igdb-api';
import QueryBuilder from '../lib/QueryBuilder';
import { GameDetailsIGDB } from '../models/igdb/GameDetailsIGDB';

class GameDetailsController {
  async get(request: Request, response: Response) {
    const { id } = request.params;
    const query = new QueryBuilder()
      .select(
        'name',
        'genres.name',
        'platforms.name',
        'cover.url',
        'first_release_date',
        'summary',
        'involved_companies.company.name',
        'aggregated_rating',
        'aggregated_rating_count',
        'rating',
        'rating_count',
        'similar_games.cover.url'
      )
      .where(`id = ${id}`)
      .build();

    try {
      const igdbApiResponse = await igdbApi.post<GameDetailsIGDB[]>('/games', query);

      if (!igdbApiResponse.data.length) {
        return response.json({ error: 'Game not found' }).status(404);
      }

      const gameDetails: GameDetails = GameDetailsMapper.from(igdbApiResponse.data[0]);

      return response.json(gameDetails);
    } catch (error) {
      return response.status(error.response.status).send(error.response.data);
    }
  }
}

export default GameDetailsController;
