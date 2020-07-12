import { GameIGDB } from './../models/igdb/GameIGDB';
import { Game } from './../models/Game';
import getDefaultImagePath from '../utils/getDefaultImagePath';

class GameMapper {
  from(gameIGDB: GameIGDB): Game {
    return {
      id: gameIGDB.id,
      name: gameIGDB.name,
      coverUrl: gameIGDB.cover?.url || getDefaultImagePath(),
      genres: gameIGDB.genres?.map(genre => genre.name) || [],
      platforms: gameIGDB.platforms?.map(platform => platform.name) || []
    };
  }
}

export default new GameMapper();
