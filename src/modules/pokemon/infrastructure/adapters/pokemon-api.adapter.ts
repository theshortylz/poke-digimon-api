import { PokemonPort } from '../../domain/ports/pokemon-port';
import axios from 'axios';
import { CharacterDto } from '../../../../domain/dto/character.dto';
import { ExternalApiException } from 'src/shared/errors/custom-exceptions';
import { BaseApiAdapter } from '../../../../infrastructure/adapters/common/base-api.adapter';

export class PokemonApiAdapter extends BaseApiAdapter implements PokemonPort {
  async getData(metadata: string, config: string): Promise<CharacterDto> {
    // Parsear metadata y config usando el método heredado
    const { metadataObj, configObj } = this.parseMetadataAndConfig(
      metadata,
      config,
    );
    const { name } = metadataObj;
    const { baseUrl } = configObj;

    let pokemonResponse;
    let pokemon;
    let speciesResponse;
    let evolutionChainResponse;
    let evolutionChain;

    // 1. Obtener datos del Pokémon
    const pokemonUrl = `${baseUrl}/pokemon/${name}`;
    try {
      pokemonResponse = await axios.get(pokemonUrl);
      pokemon = pokemonResponse.data;

      // 2. Obtener la especie para acceder a la cadena evolutiva
      speciesResponse = await axios.get(pokemon.species.url);
      const species = speciesResponse.data;

      // 3. Obtener la cadena evolutiva
      evolutionChainResponse = await axios.get(species.evolution_chain.url);
      evolutionChain = evolutionChainResponse.data;
    } catch (error) {
      if (error.response) {
        throw new ExternalApiException(
          `Pokémon API: ${error.response.status} - ${error.response.statusText}`,
        );
      }
      throw new ExternalApiException(`Pokémon API: ${error.message}`);
    }

    // 4. Extraer todas las evoluciones de la cadena
    const evolutions = this.extractEvolutions(evolutionChain.chain);

    // Retornar usando CharacterDto
    return CharacterDto.fromPokemon(pokemon, evolutions);
  }

  private extractEvolutions(chain: any): string[] {
    const evolutions: string[] = [];
    this.processEvolutionChain(chain, evolutions);
    return evolutions;
  }

  private processEvolutionChain(
    evolutionChain: any,
    evolutions: string[],
  ): void {
    if (evolutionChain.evolves_to && evolutionChain.evolves_to.length > 0) {
      evolutionChain.evolves_to.forEach((evolution: any) => {
        evolutions.push(evolution.species.name);
        this.processEvolutionChain(evolution, evolutions);
      });
    }
  }
}
