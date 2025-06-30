// src/modules/characters/characters.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterEntity } from './domain/models/entities/character.entity';
import { TypeormStorageAdapter } from './infraestructure/adapters/storage.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([CharacterEntity])],
  providers: [
    {
      provide: 'StoragePort',
      useClass: TypeormStorageAdapter,
    },
    TypeormStorageAdapter,
  ],
  exports: ['StoragePort'],
})
export class StorageModule {}
