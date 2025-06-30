import { PokemonPort } from '../../domain/ports/pokemon-port';
import { StoragePort } from '../../../../domain/ports/storage-port';
import { CharacterDto } from '../../../../domain/dto/character.dto';
import { Franchise } from 'src/shared/enums/franchise.enum';

export class GetPokemonDataUseCase {
  constructor(
    private readonly pokemonPort: PokemonPort,
    private readonly storagePort: StoragePort,
  ) {}

  async execute(
    version: string,
    metadata: string,
    config: string,
  ): Promise<CharacterDto> {
    const data = await this.pokemonPort.getData(metadata, config);

    // Almacenar el resultado
    await this.storagePort.save(
      Franchise.POKEMON,
      version,
      metadata,
      config,
      data,
    );

    return data;
  }
}
