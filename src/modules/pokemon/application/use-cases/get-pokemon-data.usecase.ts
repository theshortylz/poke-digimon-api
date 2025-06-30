import { PokemonPort } from '../../domain/ports/pokemon-port';
import { CharacterDto } from '../../../common/models/dto/character.dto';
import { Franchise } from 'src/shared/enums/franchise.enum';
import { StoragePort } from 'src/modules/storage/domain/ports/storage-port';
import { Inject } from '@nestjs/common';

export class GetPokemonDataUseCase {
  constructor(
    @Inject('PokemonPort') private readonly pokemonPort: PokemonPort,
    @Inject('StoragePort') private readonly storage: StoragePort,
  ) {}

  async execute(
    version: string,
    metadata: string,
    config: string,
  ): Promise<CharacterDto> {
    const data = await this.pokemonPort.getData(metadata, config);

    // Almacenar el resultado
    await this.storage.save(Franchise.POKEMON, version, metadata, config, data);

    return data;
  }
}
