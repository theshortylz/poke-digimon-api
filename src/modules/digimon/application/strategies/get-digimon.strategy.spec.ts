import { GetDigimonStrategy } from './get-digimon.strategy';
import { DigimonPort } from '../../domain/ports/digimon-port';
import { CharacterEntityDto } from 'src/modules/common/models/dto/character.dto';
import { CharacterStatus } from 'src/shared/enums/character-status.enum';

describe('GetDigimonStrategy', () => {
  let strategy: GetDigimonStrategy;
  let port: jest.Mocked<DigimonPort>;

  beforeEach(() => {
    port = { getData: jest.fn() } as any;
    strategy = new GetDigimonStrategy(port);
  });

  it('should call port.getData with correct params', async () => {
    const expected = new CharacterEntityDto('Agumon', ['Pepper Breath'], ['Greymon'], undefined, CharacterStatus.SUCCESS);
    port.getData.mockResolvedValue(expected);
    const result = await strategy.getData('metadata', 'config');
    expect(port.getData).toHaveBeenCalledWith('metadata', 'config');
    expect(result).toBe(expected);
  });
}); 