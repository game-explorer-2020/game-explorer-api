import { Request, Response } from 'express';

import { GameDetails } from './../models/GameDetails';
import { GameDetailsIGDB } from '../models/igdb/GameDetailsIGDB';

import GameDetailsMapper from '../mappers/GameDetailsMapper';
import GameSchema from '../schemas/GameSchema';

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
      const favoriteGame = await GameSchema.findOne({ id: gameDetails.id });
      const favoritableGameDetails: GameDetails = {
        ...gameDetails,
        favorite: !!favoriteGame
      };

      return response.json(favoritableGameDetails);
    } catch (error) {
      return response.status(error.response.status).send(error.response.data);
    }
  }
}

export default GameDetailsController;
