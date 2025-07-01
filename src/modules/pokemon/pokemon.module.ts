import { Module } from '@nestjs/common';
import { PokemonApiAdapter } from './infrastructure/adapters/pokemon-api.adapter';
import { PokemonController } from 'src/apps/pokemon/pokemon.controller';
import { StorageModule } from '../storage/storage.module';
import {
  PokemonPortProvider,
  PokemonInputPortProvider,
} from 'src/config/injection-tokens.config';
import { GetPokemonStrategy } from './application/strategies/get-pokemon.strategy';
import { GetPokemonDataUseCase } from './application/use-cases/get-pokemon-data.usecase';
import { INJECTION_TOKENS } from 'src/config/injection-tokens.config';
import { StoragePort } from '../storage/domain/ports/storage-port';
import { Franchise } from 'src/shared/enums/franchise.enum';

@Module({
  imports: [StorageModule],
  controllers: [PokemonController],
  providers: [
    PokemonPortProvider,
    PokemonInputPortProvider,
    PokemonApiAdapter,
    GetPokemonStrategy,
    GetPokemonDataUseCase,
  ],
  exports: [PokemonInputPortProvider],
})
export class PokemonModule {}
