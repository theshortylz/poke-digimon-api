import { PokemonPort } from '../../domain/ports/pokemon-port';
import { CharacterEntityDto } from '../../../common/models/dto/character.dto';
import { Franchise } from 'src/shared/enums/franchise.enum';
import { StoragePort } from 'src/modules/storage/domain/ports/storage-port';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CharacterStatus } from 'src/shared/enums/character-status.enum';
import { INJECTION_TOKENS } from 'src/config/injection-tokens.config';

@Injectable()
export class GetPokemonDataUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.POKEMON_PORT)
    private readonly pokemonPort: PokemonPort,
    @Inject(INJECTION_TOKENS.STORAGE_PORT)
    private readonly storage: StoragePort,
  ) {}

  async execute(
    version: string,
    metadata: string,
    config: string,
  ): Promise<CharacterEntityDto> {
    const data = await this.pokemonPort.getData(metadata, config);

    // Almacenar el resultado
    await this.storage.save(Franchise.POKEMON, version, metadata, config, data);

    if (data.status === CharacterStatus.FAIL) {
      throw new BadRequestException(data.errorMessage);
    }

    return data;
  }
}
