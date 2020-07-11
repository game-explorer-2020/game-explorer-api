import { GameDetails } from './../models/GameDetails';
import { Request, Response } from 'express';

import igdbApi from '../configs/igdb-api';
import QueryBuilder from '../lib/QueryBuilder';

class GameDetailsController {
  async find(request: Request, response: Response) {
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

      const {
        id: igdbGameId,
        name,
        cover,
        genres,
        platforms,
        first_release_date,
        storyline,
        involved_companies,
        aggregated_rating,
        aggregated_rating_count,
        rating,
        rating_count
      } = igdbApiResponse.data[0];

      const gameDetails: GameDetails = {
        id: igdbGameId,
        name,
        coverUrl: cover?.url || `${request.get('host')}/images/no-image.svg`,
        genres: genres?.map((genre: any) => genre.name) || [],
        platforms: platforms?.map((platform: any) => platform.name) || [],
        releaseDate: new Date(first_release_date * 1000),
        storyline,
        involvedCompanies: involved_companies?.map((involvedCompany: any) => involvedCompany?.company?.name || null) || [],
        aggregatedRating: aggregated_rating,
        aggregatedRatingCount: aggregated_rating_count,
        rating,
        ratingCount: rating_count
      };

      return response.json(gameDetails);
    } catch (error) {
      return response.status(error.response.status).send(error.response.data);
    }
  }
}

export default GameDetailsController;
