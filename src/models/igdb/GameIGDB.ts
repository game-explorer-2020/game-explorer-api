import { IdUrlIGDB } from './IdUrlIGDB';
import { IdNameIGDB } from './IdNameIGDB';

export interface GameIGDB {
  id: number;
  name: string;
  genres: IdNameIGDB[];
  platforms: IdNameIGDB[];
  cover?: IdUrlIGDB;
}
