import {
  Module,
  Global,
  DynamicModule,
  Injectable,
  Inject,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redis from 'redis';
import { RedisClientType } from 'redis';
import { INJECTION_TOKENS } from 'src/config/injection-tokens.config';

// Servicio de caché Redis
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

// Módulo de caché Redis
@Global()
@Module({})
export class RedisCacheModule {
  static register(): DynamicModule {
    return {
      module: RedisCacheModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: INJECTION_TOKENS.REDIS_CLIENT,
          useFactory: async (configService: ConfigService) => {
            const host = configService.get<string>('redis.host') || 'localhost';
            const port = configService.get<number>('redis.port') || 6379;

            const client = redis.createClient({
              socket: {
                host,
                port,
              },
            });

            await client.connect();
            return client;
          },
          inject: [ConfigService],
        },
        RedisCacheService,
      ],
      exports: [RedisCacheService],
    };
  }
}
