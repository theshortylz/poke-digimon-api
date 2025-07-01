import { Module } from '@nestjs/common';
import { DigimonApiAdapter } from './infrastructure/adapters/digimon-api.adapter';
import { GetDigimonDataUseCase } from './application/use-cases/get-digimon-data.usecase';
import { DigimonController } from 'src/apps/digimon/digimon.controller';
import { StorageModule } from '../storage/storage.module';
import { DigimonPortProvider } from 'src/config/injection-tokens.config';

@Module({
  imports: [StorageModule],
  controllers: [DigimonController],
  providers: [DigimonPortProvider, DigimonApiAdapter, GetDigimonDataUseCase],
  exports: [DigimonApiAdapter, GetDigimonDataUseCase],
})
export class DigimonModule {}
