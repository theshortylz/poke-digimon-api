import { DigimonPort } from '../../domain/ports/digimon-port';
import { StoragePort } from '../../../../domain/ports/storage-port';
import { CharacterDto } from '../../../../domain/dto/character.dto';
import { Franchise } from '../../../../shared/enums/franchise.enum';

export class GetDigimonDataUseCase {
  constructor(
    private readonly digimonPort: DigimonPort,
    private readonly storagePort: StoragePort,
  ) {}

  async execute(
    version: string,
    metadata: string,
    config: string,
  ): Promise<CharacterDto> {
    const data = await this.digimonPort.getData(metadata, config);

    // Almacenar el resultado
    await this.storagePort.save(
      Franchise.DIGIMON,
      version,
      metadata,
      config,
      data,
    );

    return data;
  }
}
