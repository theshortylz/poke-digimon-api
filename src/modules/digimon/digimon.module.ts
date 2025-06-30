import { Module } from '@nestjs/common';
import { DigimonController } from './infrastructure/controllers/digimon.controller';
import { DigimonApiAdapter } from './infrastructure/adapters/digimon-api.adapter';
import { GetDigimonDataUseCase } from './application/use-cases/get-digimon-data.usecase';
import { InMemoryStorageAdapter } from 'src/infrastructure/adapters/storage.adapter';

@Module({
  controllers: [DigimonController],
  providers: [DigimonApiAdapter, GetDigimonDataUseCase, InMemoryStorageAdapter],
  exports: [DigimonApiAdapter, GetDigimonDataUseCase],
})
export class DigimonModule {}
