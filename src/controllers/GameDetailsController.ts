import { GameDetails } from './../models/GameDetails';
import { Request, Response } from 'express';

import GameDetailsMapper from '../mappers/GameDetailsMapper';
import igdbApi from '../configs/igdb-api';
import QueryBuilder from '../lib/QueryBuilder';

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
        'storyline',
        'involved_companies.company.name',
        'aggregated_rating',
        'aggregated_rating_count',
        'rating',
        'rating_count'
      )
      .where(`id = ${id}`)
      .build();

    try {
      const igdbApiResponse = await igdbApi.post('/games', query);

      if (!igdbApiResponse.data.length) {
        return response.json({ error: 'Game not found' }).status(404);
      }

      const mappedGameDetails: GameDetails = GameDetailsMapper.from(igdbApiResponse.data[0]);
      const gameDetails: GameDetails = {
        ...mappedGameDetails,
        coverUrl: mappedGameDetails.coverUrl || `${request.get('host')}/images/no-image.svg`
      };

      return response.json(gameDetails);
    } catch (error) {
      return response.status(error.response.status).send(error.response.data);
    }
  }
}

export default GameDetailsController;
