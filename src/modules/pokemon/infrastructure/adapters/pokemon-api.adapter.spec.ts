import { PokemonApiAdapter } from './pokemon-api.adapter';
import axios from 'axios';
import { CharacterStatus } from 'src/shared/enums/character-status.enum';
import { CharacterEntityDto } from 'src/modules/common/models/dto/character.dto';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PokemonApiAdapter', () => {
  let adapter: PokemonApiAdapter;

  beforeEach(() => {
    adapter = new PokemonApiAdapter();
    jest.clearAllMocks();
  });

  it('should fetch and map pokemon data successfully', async () => {
    // Arrange
    const metadata = JSON.stringify({ name: 'pikachu' });
    const config = JSON.stringify({ baseUrl: 'https://pokeapi.co/api/v2' });
    const pokemonData = { name: 'pikachu', abilities: [{ ability: { name: 'static' } }], species: { url: 'species-url' }, weight: 60 };
    const speciesData = { evolution_chain: { url: 'evolution-chain-url' } };
    const evolutionChainData = { chain: { evolves_to: [{ species: { name: 'raichu' }, evolves_to: [] }] } };

    mockedAxios.get
      .mockResolvedValueOnce({ data: pokemonData })
      .mockResolvedValueOnce({ data: speciesData })
      .mockResolvedValueOnce({ data: evolutionChainData });

    // Act
    const result = await adapter.getData(metadata, config);

    // Assert
    expect(result).toBeInstanceOf(CharacterEntityDto);
    expect(result.name).toBe('pikachu');
    expect(result.powers).toEqual(['static']);
    expect(result.evolutions).toEqual(['raichu']);
    expect(result.status).toBe(CharacterStatus.SUCCESS);
    expect(mockedAxios.get).toHaveBeenCalledTimes(3);
  });

  it('should handle API errors gracefully', async () => {
    // Arrange
    const metadata = JSON.stringify({ name: 'invalid' });
    const config = JSON.stringify({ baseUrl: 'https://pokeapi.co/api/v2' });
    mockedAxios.get.mockRejectedValueOnce({ response: { status: 404, statusText: 'Not Found' } });

    // Act
    const result = await adapter.getData(metadata, config);

    // Assert
    expect(result.status).toBe(CharacterStatus.FAIL);
    expect(result.errorMessage).toContain('Pokémon API: 404');
  });
}); 