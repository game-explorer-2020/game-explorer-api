import { Request, Response } from 'express';

import { Feed } from './../models/Feed';
import FeedMapper from '../mappers/FeedMapper';

import igdbApi from '../configs/igdb-api';
import QueryBuilder from '../lib/QueryBuilder';

class FeedController {
  async index(request: Request, response: Response) {
    const { offset = 0 } = request.query;
    const query = new QueryBuilder()
      .select('title', 'published_at', 'website.url', 'image')
      .sort('published_at')
      .offset(Number(offset))
      .build();

    try {
      const igdbApiResponse = await igdbApi.post('/pulses', query);
      const feeds: Feed[] = igdbApiResponse.data.map((pulse: any) => FeedMapper.from(pulse));

      return response.json(feeds);
    } catch (error) {
      return response.status(error.response.status).send(error.response.data);
    }
  }
}

export default FeedController;
