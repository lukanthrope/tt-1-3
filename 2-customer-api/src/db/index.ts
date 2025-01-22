import { drizzle } from 'drizzle-orm/node-postgres';
import { config } from '../config.js';

const db = drizzle(config.DB_URL);

export class DatabaseService {
  private instance: typeof db;

  constructor() {
    this.instance = db;
  }

  public getInstance(): typeof db {
    return this.instance;
  }
}
