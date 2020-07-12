import { SimilarGame } from './SimilarGame';
import { Game } from './Game';

export interface GameDetails extends Game {
  releaseDate: number; // unix timestamp
  summary: string;
  involvedCompanies: string[];
  rating?: number;
  ratingCount?: number;
  aggregatedRating?: number;
  aggregatedRatingCount?: number;
  similarGames: SimilarGame[];
}
