import { PokemonPort } from '../../domain/ports/pokemon-port';
import axios from 'axios';
import { CharacterDto } from '../../../common/models/dto/character.dto';
import { ExternalApiException } from 'src/shared/errors/custom-exceptions';
import { BaseApiAdapter } from 'src/modules/common/adapters/base-api.adapter';
import { Franchise } from 'src/shared/enums/franchise.enum';

export class PokemonApiAdapter extends BaseApiAdapter implements PokemonPort {
  private readonly franchise = Franchise.POKEMON;

  async getData(metadata: string, config: string): Promise<CharacterDto> {
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

      return CharacterDto.fromPokemon(pokemon, evolutions);
    } catch (error: any) {
      throw new ExternalApiException(this.formatErrorMessage(error));
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
