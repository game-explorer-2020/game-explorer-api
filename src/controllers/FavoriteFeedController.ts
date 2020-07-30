import { Request, Response } from 'express';

import FeedSchema from '../schemas/FeedSchema';

class FavoriteFeedController {
  async index(request: Request, response: Response) {}

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
