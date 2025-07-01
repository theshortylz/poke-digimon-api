import { PokemonInputPort } from '../../domain/ports/pokemon-input-port';
import { CharacterEntityDto } from 'src/modules/common/models/dto/character.dto';
import { GetPokemonDataUseCase } from '../use-cases/get-pokemon-data.usecase';

export class PokemonInputAdapter implements PokemonInputPort {
  constructor(private readonly getPokemonDataUseCase: GetPokemonDataUseCase) {}

  async execute(
    version: string,
    metadata: any,
    config: any,
  ): Promise<CharacterEntityDto> {
    return await this.getPokemonDataUseCase.execute(version, metadata, config);
  }
}
