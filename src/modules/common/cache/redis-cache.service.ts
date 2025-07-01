import { Injectable, Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { INJECTION_TOKENS } from 'src/config/injection-tokens.config';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(INJECTION_TOKENS.REDIS_CLIENT)
    private readonly redisClient: RedisClientType,
  ) {}

  async get(key: string): Promise<any> {
    return await this.redisClient.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<any> {
    if (ttl) {
      return await this.redisClient.set(key, value, { EX: ttl });
    } else {
      return await this.redisClient.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.redisClient.exists(key);
    return result === 1;
  }

  async flushAll(): Promise<void> {
    await this.redisClient.flushAll();
  }
}
