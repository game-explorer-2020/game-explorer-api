import { Game } from './Game';

export interface GameDetails extends Omit<Game, 'popularity'> {
  releaseDate: Date;
  storyline: string;
  involvedCompanies: string[];
  rating: number;
  ratingCount: number;
  aggregatedRating: number;
  aggregatedRatingCount: number;
}
