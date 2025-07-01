import { DigimonPort } from '../../domain/ports/digimon-port';
import { CharacterEntityDto } from '../../../common/models/dto/character.dto';
import { Franchise } from '../../../../shared/enums/franchise.enum';
import { StoragePort } from 'src/modules/storage/domain/ports/storage-port';
import { Inject } from '@nestjs/common';

export class GetDigimonDataUseCase {
  constructor(
    @Inject('DigimonPort') private readonly digimonPort: DigimonPort,
    @Inject('StoragePort') private readonly storage: StoragePort,
  ) {}

  async execute(
    version: string,
    metadata: string,
    config: string,
  ): Promise<CharacterEntityDto> {
    const data = await this.digimonPort.getData(metadata, config);

    // Almacenar el resultado
    await this.storage.save(Franchise.DIGIMON, version, metadata, config, data);

    return data;
  }
}
