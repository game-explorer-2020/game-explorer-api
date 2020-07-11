import { Game } from './../models/Game';

class GameMapper {
  from(gameIGDB: any): Game {
    return {
      id: gameIGDB.id,
      name: gameIGDB.name,
      coverUrl: gameIGDB.cover?.url || `${process.env.APP_URL}/images/no-image.svg`,
      popularity: gameIGDB.popularity,
      genres: gameIGDB.genres?.map((genre: any) => genre.name) || [],
      platforms: gameIGDB.platforms?.map((platform: any) => platform.name) || []
    };
  }
}

export default new GameMapper();
