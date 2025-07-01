// src/modules/characters/characters.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterEntity } from './domain/models/entities/character.entity';
import { TypeormStorageAdapter } from './infraestructure/adapters/storage.adapter';
import {
  StoragePortProvider,
  INJECTION_TOKENS,
} from 'src/config/injection-tokens.config';
import { RedisCacheModule } from 'src/modules/common/cache/redis-cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CharacterEntity]),
    RedisCacheModule.register(),
  ],
  providers: [StoragePortProvider, TypeormStorageAdapter],
  exports: [INJECTION_TOKENS.STORAGE_PORT],
})
export class StorageModule {}
