import { Module } from '@nestjs/common';
import { PokemonController } from './infrastructure/controllers/pokemon.controller';
import { PokemonApiAdapter } from './infrastructure/adapters/pokemon-api.adapter';
import { GetPokemonDataUseCase } from './application/use-cases/get-pokemon-data.usecase';
import { InMemoryStorageAdapter } from 'src/infrastructure/adapters/storage.adapter';

@Module({
  controllers: [PokemonController],
  providers: [PokemonApiAdapter, GetPokemonDataUseCase, InMemoryStorageAdapter],
  exports: [PokemonApiAdapter, GetPokemonDataUseCase],
})
export class PokemonModule {}
