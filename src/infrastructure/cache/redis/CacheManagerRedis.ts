import { RedisClient, createClient } from "redis";
import { promisify } from "util";

import config from "../../config/environment";
import { ICacheManager } from "../ICacheManager";

export class CacheManagerRedis implements ICacheManager {
  private static instance: CacheManagerRedis;
  private client: RedisClient;
  private getAsync: any;
  private setAsync: any;
  private deleteAsync: any;

  private constructor() {
    this.client = this.createConnection();
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.deleteAsync = promisify(this.client.del).bind(this.client);
  }

  public getRedisClient(): RedisClient {
    return this.client;
  }

  async get(key: string): Promise<string> {
    return this.getAsync(key);
  }

  public async set(key: string, value: string): Promise<void> {
    await this.setAsync(key, value);
  }

  public async delete(key: string): Promise<void> {
    await this.deleteAsync(key);
  }

  static getInstance(): CacheManagerRedis {
    if (!CacheManagerRedis.instance) {
      CacheManagerRedis.instance = new CacheManagerRedis();
    }
    return CacheManagerRedis.instance;
  }

  public createConnection(): RedisClient {
    let connection;
    if (!this.client) {
      connection = createClient(Number(config.cache.port), config.cache.host);
      // only production
      if (process.env.REDIS_PASSWORD) {
        connection.auth(process.env.REDIS_PASSWORD);
      }
    }
    return connection;
  }
}
