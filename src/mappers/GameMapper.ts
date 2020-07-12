import { Game } from './../models/Game';
import CoverUrlMapper from './CoverUrlMapper';

class GameMapper {
  from(gameIGDB: any): Game {
    return {
      id: gameIGDB.id,
      name: gameIGDB.name,
      coverUrl: CoverUrlMapper.from(gameIGDB),
      genres: gameIGDB.genres?.map((genre: any) => genre.name) || [],
      platforms: gameIGDB.platforms?.map((platform: any) => platform.name) || []
    };
  }
}

export default new GameMapper();
