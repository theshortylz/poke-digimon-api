import { GetCharacterStrategy } from '../strategies/get-character.strategy';
import { StoragePort } from 'src/modules/storage/domain/ports/storage-port';
import { CharacterStatus } from 'src/shared/enums/character-status.enum';
import { NotFoundException, Inject } from '@nestjs/common';
import { INJECTION_TOKENS } from 'src/config/injection-tokens.config';

export class GetCharacterDataUseCase {
  constructor(
    private readonly strategy: GetCharacterStrategy,
    @Inject(INJECTION_TOKENS.STORAGE_PORT)
    private readonly storage: StoragePort,
    private readonly franchise: string,
  ) {}

  async execute(version: string, metadata: string, config: string) {
    const data = await this.strategy.getData(metadata, config);
    await this.storage.save(this.franchise, version, metadata, config, data);
    if (data.status === CharacterStatus.FAIL) {
      throw new NotFoundException(data.errorMessage);
    }
    return data;
  }
}
