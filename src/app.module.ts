import { Module } from '@nestjs/common';
import { PokemonModule } from './modules/pokemon/pokemon.module';
import { DigimonModule } from './modules/digimon/digimon.module';
import { StorageController } from './infrastructure/controllers/storage.controller';
import { InMemoryStorageAdapter } from './infrastructure/adapters/storage.adapter';

@Module({
  imports: [PokemonModule, DigimonModule],
  controllers: [StorageController],
  providers: [InMemoryStorageAdapter],
})
export class AppModule {}
