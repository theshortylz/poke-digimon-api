import { ApiPort } from 'src/modules/common/ports/api-port';
import { StoragePort } from '../modules/storage/domain/ports/storage-port';
import { CharacterEntityDto } from 'src/modules/common/models/dto/character.dto';

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
  ): Promise<CharacterEntityDto> {
    const data = await this.apiPort.getData(metadata, config);

    await this.storagePort.save(franquicia, version, metadata, config, data);

    return data;
  }
}
