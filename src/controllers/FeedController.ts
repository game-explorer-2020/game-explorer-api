import { PulseIGDB } from './../models/igdb/PulseIGDB';
import { Request, Response } from 'express';

import { Feed } from './../models/Feed';
import FeedMapper from '../mappers/FeedMapper';
import FeedSchema from '../schemas/FeedSchema';

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
      const igdbApiResponse = await igdbApi.post<PulseIGDB[]>('/pulses', query);
      const feeds: Feed[] = igdbApiResponse.data.map(pulse => FeedMapper.from(pulse));
      const favoriteFeeds = await FeedSchema.find()
        .where('id')
        .in(feeds.map(f => f.id));
      const favoritableFeeds = feeds.map(feed => ({
        ...feed,
        favorite: favoriteFeeds.some(f => f.id === feed.id)
      }));

      return response.json(favoritableFeeds);
    } catch (error) {
      return response.status(error.response.status).send(error.response.data);
    }
  }
}

export default FeedController;
