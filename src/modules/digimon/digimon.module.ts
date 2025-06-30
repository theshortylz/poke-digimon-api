import { Module } from '@nestjs/common';
import { DigimonApiAdapter } from './infrastructure/adapters/digimon-api.adapter';
import { GetDigimonDataUseCase } from './application/use-cases/get-digimon-data.usecase';
import { DigimonController } from 'src/apps/digimon/digimon.controller';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [DigimonController],
  providers: [
    {
      provide: 'DigimonPort',
      useClass: DigimonApiAdapter,
    },
    DigimonApiAdapter,
    GetDigimonDataUseCase,
  ],
  exports: [DigimonApiAdapter, GetDigimonDataUseCase],
})
export class DigimonModule {}
