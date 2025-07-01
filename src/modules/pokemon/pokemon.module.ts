import { Module } from '@nestjs/common';
import { PokemonApiAdapter } from './infrastructure/adapters/pokemon-api.adapter';
import { GetPokemonDataUseCase } from './application/use-cases/get-pokemon-data.usecase';
import { PokemonController } from 'src/apps/pokemon/pokemon.controller';
import { StorageModule } from '../storage/storage.module';
import {
  PokemonPortProvider,
  INJECTION_TOKENS,
} from 'src/config/injection-tokens.config';

@Module({
  imports: [StorageModule],
  controllers: [PokemonController],
  providers: [PokemonPortProvider, PokemonApiAdapter, GetPokemonDataUseCase],
  exports: [PokemonApiAdapter, GetPokemonDataUseCase],
})
export class PokemonModule {}
