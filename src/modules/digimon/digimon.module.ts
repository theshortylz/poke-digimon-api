import { Module } from '@nestjs/common';
import { DigimonApiAdapter } from './infrastructure/adapters/digimon-api.adapter';
import { DigimonController } from 'src/apps/digimon/digimon.controller';
import { StorageModule } from '../storage/storage.module';
import { DigimonPortProvider } from 'src/config/injection-tokens.config';
import { GetDigimonStrategy } from './application/strategies/get-digimon.strategy';
import { GetCharacterDataUseCase } from 'src/modules/common/use-cases/get-character-data.usecase';
import { INJECTION_TOKENS } from 'src/config/injection-tokens.config';
import { Franchise } from 'src/shared/enums/franchise.enum';
import { StoragePort } from '../storage/domain/ports/storage-port';

@Module({
  imports: [StorageModule],
  controllers: [DigimonController],
  providers: [
    DigimonPortProvider,
    DigimonApiAdapter,
    GetDigimonStrategy,
    {
      provide: GetCharacterDataUseCase,
      useFactory: (strategy: GetDigimonStrategy, storage: StoragePort) =>
        new GetCharacterDataUseCase(strategy, storage, Franchise.DIGIMON),
      inject: [GetDigimonStrategy, INJECTION_TOKENS.STORAGE_PORT],
    },
  ],
  exports: [GetCharacterDataUseCase],
})
export class DigimonModule {}
