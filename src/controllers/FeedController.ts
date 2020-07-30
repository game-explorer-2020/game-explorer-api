import { Request, Response } from 'express';

import { PulseIGDB } from './../models/igdb/PulseIGDB';
import { Feed } from './../models/Feed';

import FeedMapper from '../mappers/FeedMapper';
import FeedSchema from '../schemas/FeedSchema';

import igdbApi from '../configs/igdb-api';
import QueryBuilder from '../lib/QueryBuilder';

class FeedController {
  private fields = ['title', 'published_at', 'website.url', 'image'];

  async index(request: Request, response: Response) {
    const { offset = 0 } = request.query;
    const query = new QueryBuilder()
      .select(...this.fields)
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

  async getFavorites(request: Request, response: Response) {
    const { offset = 0 } = request.query;
    const favoriteFeeds = await FeedSchema.find();

    if (!favoriteFeeds.length) {
      return response.json([]);
    }

    const query = new QueryBuilder()
      .select(...this.fields)
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

  async toggleFavorite(request: Request, response: Response) {
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

export default FeedController;
