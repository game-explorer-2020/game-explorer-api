import { Request, Response } from 'express';

import GameSchema from '../schemas/GameSchema';

class FavoriteGameController {
  async index(request: Request, response: Response) {}

  async store(request: Request, response: Response) {
    const { id } = request.params;

    const favoriteGame = await GameSchema.findOne({ id: Number(id) });

    if (favoriteGame) {
      await favoriteGame.remove();
      return response.status(200).json({ message: 'The game is now unfavorited.' });
    }

    await GameSchema.create({ id: Number(id) });
    return response.status(200).json({ message: 'The game is now favorited.' });
  }
}

export default FavoriteGameController;
