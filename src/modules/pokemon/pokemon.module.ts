import { Module } from '@nestjs/common';
import { PokemonApiAdapter } from './infrastructure/adapters/pokemon-api.adapter';
import { PokemonController } from 'src/apps/pokemon/pokemon.controller';
import { StorageModule } from '../storage/storage.module';
import { PokemonPortProvider } from 'src/config/injection-tokens.config';
import { GetPokemonStrategy } from './application/strategies/get-pokemon.strategy';
import { GetCharacterDataUseCase } from 'src/modules/common/use-cases/get-character-data.usecase';
import { INJECTION_TOKENS } from 'src/config/injection-tokens.config';
import { StoragePort } from '../storage/domain/ports/storage-port';
import { Franchise } from 'src/shared/enums/franchise.enum';

@Module({
  imports: [StorageModule],
  controllers: [PokemonController],
  providers: [
    PokemonPortProvider,
    PokemonApiAdapter,
    GetPokemonStrategy,
    {
      provide: GetCharacterDataUseCase,
      useFactory: (strategy: GetPokemonStrategy, storage: StoragePort) =>
        new GetCharacterDataUseCase(strategy, storage, Franchise.POKEMON),
      inject: [GetPokemonStrategy, INJECTION_TOKENS.STORAGE_PORT],
    },
  ],
  exports: [GetCharacterDataUseCase],
})
export class PokemonModule {}
