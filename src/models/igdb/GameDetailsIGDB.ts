import { IdUrlIGDB } from './IdUrlIGDB';
import { IdNameIGDB } from './IdNameIGDB';
import { GameIGDB } from './GameIGDB';

export interface GameDetailsIGDB extends GameIGDB {
  first_release_date: number;
  summary: string;
  rating?: number;
  rating_count?: number;
  aggregated_rating?: number;
  aggregated_rating_count?: number;
  involved_companies: Array<{
    id: number;
    company: IdNameIGDB;
  }>;
  similar_games: Array<{
    id: number;
    cover: IdUrlIGDB;
  }>;
}
