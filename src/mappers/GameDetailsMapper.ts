import { GameDetailsIGDB } from './../models/igdb/GameDetailsIGDB';
import { GameDetails } from './../models/GameDetails';
import GameMapper from './GameMapper';
import getDefaultImagePath from '../utils/getDefaultImagePath';

class GameDetailsMapper {
  from(gameDetailsIGDB: GameDetailsIGDB): GameDetails {
    const mappedGame = GameMapper.from(gameDetailsIGDB);

    return {
      ...mappedGame,
      releaseDate: gameDetailsIGDB.first_release_date,
      summary: gameDetailsIGDB.summary,
      involvedCompanies: gameDetailsIGDB.involved_companies?.map(involvedCompany => involvedCompany?.company?.name) || [],
      aggregatedRating: gameDetailsIGDB.aggregated_rating,
      aggregatedRatingCount: gameDetailsIGDB.aggregated_rating_count,
      rating: gameDetailsIGDB.rating,
      ratingCount: gameDetailsIGDB.rating_count,
      similarGames: (gameDetailsIGDB.similar_games || []).map(game => ({
        id: game.id,
        coverUrl: game.cover?.url || getDefaultImagePath()
      }))
    };
  }
}

export default new GameDetailsMapper();
