import { Request, Response } from 'express';

import FeedSchema from '../schemas/FeedSchema';
import QueryBuilder from '../lib/QueryBuilder';

import { PulseIGDB } from './../models/igdb/PulseIGDB';
import { Feed } from './../models/Feed';
import FeedMapper from '../mappers/FeedMapper';
import igdbApi from '../configs/igdb-api';

class FavoriteFeedController {
  async index(request: Request, response: Response) {
    const { offset = 0 } = request.query;
    const favoriteFeeds = await FeedSchema.find();
    const query = new QueryBuilder()
      .select('title', 'published_at', 'website.url', 'image')
      .where(`id = (${favoriteFeeds.map(f => f.id)})`)
      .sort('published_at')
      .offset(Number(offset))
      .build();

    try {
      const igdbApiResponse = await igdbApi.post<PulseIGDB[]>('/pulses', query);
      const feeds: Feed[] = igdbApiResponse.data.map(pulse => ({ ...FeedMapper.from(pulse), favorite: true }));

      return response.json(feeds);
    } catch (error) {
      return response.status(error.response.status).send(error.response.data);
    }
  }

  async store(request: Request, response: Response) {
    const { id } = request.params;

    const favoriteFeed = await FeedSchema.findOne({ id: Number(id) });

    if (favoriteFeed) {
      await favoriteFeed.remove();
      return response.status(200).json({ message: 'The feed is now unfavorited.' });
    }

    await FeedSchema.create({ id: Number(id) });
    return response.status(200).json({ message: 'The feed is now favorited.' });
  }
}

export default FavoriteFeedController;
