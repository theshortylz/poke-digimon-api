import { GetPokemonStrategy } from './get-pokemon.strategy';
import { PokemonPort } from '../../domain/ports/pokemon-port';
import { CharacterEntityDto } from 'src/modules/common/models/dto/character.dto';
import { CharacterStatus } from 'src/shared/enums/character-status.enum';

describe('GetPokemonStrategy', () => {
  let strategy: GetPokemonStrategy;
  let port: jest.Mocked<PokemonPort>;

  beforeEach(() => {
    port = { getData: jest.fn() } as any;
    strategy = new GetPokemonStrategy(port);
  });

  it('should call port.getData with correct params', async () => {
    const expected = new CharacterEntityDto(
      'pikachu',
      ['static'],
      ['raichu'],
      60,
      CharacterStatus.SUCCESS,
    );
    port.getData.mockResolvedValue(expected);
    const result = await strategy.getData('metadata', 'config');
    expect(port.getData).toHaveBeenCalledWith('metadata', 'config');
    expect(result).toBe(expected);
  });
});
