import { Request, Response } from 'express';

import { Game } from './../models/Game';
import GameMapper from '../mappers/GameMapper';
import igdbApi from '../configs/igdb-api';
import QueryBuilder from '../lib/QueryBuilder';

class FeedController {
  async index(request: Request, response: Response) {
    return response.json('feeds');
  }
}

export default FeedController;
