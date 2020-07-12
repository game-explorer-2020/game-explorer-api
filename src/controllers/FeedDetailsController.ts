import { GameDetails } from './../models/GameDetails';
import { Request, Response } from 'express';

import GameDetailsMapper from '../mappers/GameDetailsMapper';
import igdbApi from '../configs/igdb-api';
import QueryBuilder from '../lib/QueryBuilder';

class FeedDetailsController {
  async get(request: Request, response: Response) {
    return response.json('feed details');
  }
}

export default FeedDetailsController;
