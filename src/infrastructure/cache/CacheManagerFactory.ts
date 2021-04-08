import { ICacheManager } from "./ICacheManager";
import { CacheManagerRedis } from "./redis/CacheManagerRedis";

export class CacheManagerFactory {
  private static instance: CacheManagerFactory;

  static getInstance(): CacheManagerFactory {
    if (!CacheManagerFactory.instance) {
      CacheManagerFactory.instance = new CacheManagerFactory();
    }

    return CacheManagerFactory.instance;
  }

  public createCacheManager(): ICacheManager {
    return CacheManagerRedis.getInstance();
  }
}
