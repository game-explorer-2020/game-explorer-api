import GameMapper from './GameMapper';
import CoverUrlMapper from './CoverUrlMapper';
import { GameDetails } from './../models/GameDetails';

class GameDetailsMapper {
  from(gameIGDB: any): GameDetails {
    const mappedGame = GameMapper.from(gameIGDB);

    return {
      ...mappedGame,
      releaseDate: new Date(gameIGDB.first_release_date * 1000),
      summary: gameIGDB.summary,
      involvedCompanies: gameIGDB.involved_companies?.map((involvedCompany: any) => involvedCompany?.company?.name || null) || [],
      aggregatedRating: gameIGDB.aggregated_rating,
      aggregatedRatingCount: gameIGDB.aggregated_rating_count,
      rating: gameIGDB.rating,
      ratingCount: gameIGDB.rating_count,
      similarGames: (gameIGDB.similar_games || []).map((game: any) => ({
        id: game.id,
        coverUrl: CoverUrlMapper.from(game)
      }))
    };
  }
}

export default new GameDetailsMapper();
