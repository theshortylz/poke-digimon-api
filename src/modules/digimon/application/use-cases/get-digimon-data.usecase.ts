import { DigimonPort } from '../../domain/ports/digimon-port';
import { CharacterEntityDto } from '../../../common/models/dto/character.dto';
import { Franchise } from '../../../../shared/enums/franchise.enum';
import { StoragePort } from 'src/modules/storage/domain/ports/storage-port';
import { BadRequestException, Inject } from '@nestjs/common';
import { CharacterStatus } from 'src/shared/enums/character-status.enum';
import { INJECTION_TOKENS } from 'src/config/injection-tokens.config';

export class GetDigimonDataUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.DIGIMON_PORT)
    private readonly digimonPort: DigimonPort,
    @Inject(INJECTION_TOKENS.STORAGE_PORT)
    private readonly storage: StoragePort,
  ) {}

  async execute(
    version: string,
    metadata: string,
    config: string,
  ): Promise<CharacterEntityDto> {
    const data = await this.digimonPort.getData(metadata, config);

    await this.storage.save(Franchise.DIGIMON, version, metadata, config, data);

    if (data.status === CharacterStatus.FAIL) {
      throw new BadRequestException(data.errorMessage);
    }

    return data;
  }
}
