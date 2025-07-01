import { Module } from '@nestjs/common';
import { PokemonModule } from './modules/pokemon/pokemon.module';
import { DigimonModule } from './modules/digimon/digimon.module';
import { StorageController } from './apps/storage/storage.controller';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { StorageModule } from './modules/storage/storage.module';
import { RedisCacheModule } from './modules/common/cache/redis-cache.module';
import configuration from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    RedisCacheModule.register(),
    PokemonModule,
    DigimonModule,
    DatabaseModule,
    StorageModule,
  ],
  controllers: [StorageController],
  providers: [],
})
export class AppModule {}
