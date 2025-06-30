import { Module } from '@nestjs/common';
import { PokemonApiAdapter } from './infrastructure/adapters/pokemon-api.adapter';
import { GetPokemonDataUseCase } from './application/use-cases/get-pokemon-data.usecase';
import { PokemonController } from 'src/apps/pokemon/pokemon.controller';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [PokemonController],
  providers: [
    {
      provide: 'PokemonPort',
      useClass: PokemonApiAdapter,
    },
    PokemonApiAdapter,
    GetPokemonDataUseCase,
  ],
  exports: [PokemonApiAdapter, GetPokemonDataUseCase],
})
export class PokemonModule {}
