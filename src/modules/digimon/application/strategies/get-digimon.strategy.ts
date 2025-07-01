import { GetCharacterStrategy } from 'src/modules/common/strategies/get-character.strategy';
import { DigimonPort } from 'src/modules/digimon/domain/ports/digimon-port';
import { Injectable, Inject } from '@nestjs/common';
import { INJECTION_TOKENS } from 'src/config/injection-tokens.config';

@Injectable()
export class GetDigimonStrategy implements GetCharacterStrategy {
  constructor(
    @Inject(INJECTION_TOKENS.DIGIMON_PORT)
    private readonly digimonPort: DigimonPort,
  ) {}
  getData(metadata: string, config: string) {
    return this.digimonPort.getData(metadata, config);
  }
}
