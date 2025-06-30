import { ApiPort } from 'src/modules/common/ports/api-port';
import { CharacterDto } from '../modules/common/models/dto/character.dto';
import { StoragePort } from '../modules/storage/domain/ports/storage-port';

export class GetFranchiseDataUseCase {
  constructor(
    private readonly apiPort: ApiPort,
    private readonly storagePort: StoragePort,
  ) {}

  async execute(
    franquicia: string,
    version: string,
    metadata: any,
    config: any,
  ): Promise<CharacterDto> {
    const data = await this.apiPort.getData(metadata, config);

    // Almacenar el resultado como se requiere en los requisitos
    await this.storagePort.save(franquicia, version, metadata, config, data);

    return data;
  }
}
