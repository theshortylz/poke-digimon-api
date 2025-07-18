import { PokemonPort } from '../../domain/ports/pokemon-port';
import axios from 'axios';
import {
  CharacterEntityDto,
  CharacterMapper,
} from '../../../common/models/dto/character.dto';
import { BaseApiAdapter } from 'src/modules/common/adapters/base-api.adapter';
import { Franchise } from 'src/shared/enums/franchise.enum';
import { CharacterStatus } from 'src/shared/enums/character-status.enum';
import { Logger } from '@nestjs/common';

export class PokemonApiAdapter extends BaseApiAdapter implements PokemonPort {
  private readonly logger = new Logger(PokemonApiAdapter.name);
  private readonly franchise = Franchise.POKEMON;

  async getData(metadata: string, config: string): Promise<CharacterEntityDto> {
    const { metadataObj, configObj } = this.parseMetadataAndConfig(
      metadata,
      config,
    );

    const { name } = metadataObj;
    const { baseUrl } = configObj;

    try {
      const pokemon = await this.fetchPokemon(baseUrl, name);
      const species = await this.fetchSpecies(pokemon.species.url);
      const evolutionChain = await this.fetchEvolutionChain(
        species.evolution_chain.url,
      );

      const evolutions = this.extractEvolutions(evolutionChain.chain);

      return CharacterMapper.fromPokemon(
        pokemon,
        evolutions,
        CharacterStatus.SUCCESS,
        null,
      );
    } catch (error: any) {
      this.logger.error(
        `An error occurred while getting data from pokemon API: ${error.message}`,
        error,
      );

      return CharacterMapper.fromPokemon(
        { name: name || '', abilities: [], weight: undefined },
        [],
        CharacterStatus.FAIL,
        this.formatErrorMessage(error),
      );
    }
  }

  private async fetchPokemon(baseUrl: string, name: string) {
    const { data } = await axios.get(`${baseUrl}/${this.franchise}/${name}`);
    return data;
  }

  private async fetchSpecies(speciesUrl: string) {
    const { data } = await axios.get(speciesUrl);
    return data;
  }

  private async fetchEvolutionChain(evolutionChainUrl: string) {
    const { data } = await axios.get(evolutionChainUrl);
    return data;
  }

  private extractEvolutions(chain: any): string[] {
    const evolutions: string[] = [];
    this.collectEvolutions(chain, evolutions);
    return evolutions;
  }

  private collectEvolutions(chain: any, evolutions: string[]): void {
    for (const evo of chain.evolves_to || []) {
      evolutions.push(evo.species.name);
      this.collectEvolutions(evo, evolutions);
    }
  }

  private formatErrorMessage(error: any): string {
    return error?.response
      ? `Pokémon API: ${error.response.status} - ${error.response.statusText}`
      : `Pokémon API: ${error.message}`;
  }
}
