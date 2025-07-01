import { Module, Global, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redis from 'redis';
import { INJECTION_TOKENS } from 'src/config/injection-tokens.config';
import { RedisCacheService } from './redis-cache.service';

// Redis cache module
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
