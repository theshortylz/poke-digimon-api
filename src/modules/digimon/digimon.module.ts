import { Module } from '@nestjs/common';
import { DigimonApiAdapter } from './infrastructure/adapters/digimon-api.adapter';
import { DigimonController } from 'src/apps/digimon/digimon.controller';
import { StorageModule } from '../storage/storage.module';
import {
  DigimonPortProvider,
  DigimonInputPortProvider,
} from 'src/config/injection-tokens.config';
import { GetDigimonStrategy } from './application/strategies/get-digimon.strategy';
import { GetDigimonDataUseCase } from './application/use-cases/get-digimon-data.usecase';
import { INJECTION_TOKENS } from 'src/config/injection-tokens.config';
import { Franchise } from 'src/shared/enums/franchise.enum';
import { StoragePort } from '../storage/domain/ports/storage-port';

@Module({
  imports: [StorageModule],
  controllers: [DigimonController],
  providers: [
    DigimonPortProvider,
    DigimonInputPortProvider,
    DigimonApiAdapter,
    GetDigimonStrategy,
    GetDigimonDataUseCase,
  ],
  exports: [DigimonInputPortProvider],
})
export class DigimonModule {}
