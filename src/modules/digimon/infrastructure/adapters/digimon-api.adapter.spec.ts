import { DigimonApiAdapter } from './digimon-api.adapter';
import axios from 'axios';
import { CharacterStatus } from 'src/shared/enums/character-status.enum';
import { CharacterEntityDto } from 'src/modules/common/models/dto/character.dto';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('DigimonApiAdapter', () => {
  let adapter: DigimonApiAdapter;

  beforeEach(() => {
    adapter = new DigimonApiAdapter();
    jest.clearAllMocks();
  });

  it('should fetch and map digimon data successfully', async () => {
    // Arrange
    const metadata = JSON.stringify({ id: 42 });
    const config = JSON.stringify({ baseUrl: 'https://digi-api.com/api/v1' });
    const digimonData = {
      name: 'Agumon',
      skills: [{ skill: 'Pepper Breath' }],
      priorEvolutions: [{ digimon: 'Botamon' }],
      nextEvolutions: [{ digimon: 'Greymon' }, { digimon: 'SkullGreymon' }],
    };
    mockedAxios.get.mockResolvedValueOnce({ data: digimonData });

    // Act
    const result = await adapter.getData(metadata, config);

    // Assert
    expect(result).toBeInstanceOf(CharacterEntityDto);
    expect(result.name).toBe('Agumon');
    expect(result.powers).toEqual(['Pepper Breath']);
    expect(result.evolutions).toEqual(['Botamon', 'Greymon', 'SkullGreymon']);
    expect(result.status).toBe(CharacterStatus.SUCCESS);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  it('should handle API errors gracefully', async () => {
    // Arrange
    const metadata = JSON.stringify({ id: 9999 });
    const config = JSON.stringify({ baseUrl: 'https://digi-api.com/api/v1' });
    mockedAxios.get.mockRejectedValueOnce({ response: { status: 400, statusText: 'Bad Request' } });

    // Act
    const result = await adapter.getData(metadata, config);

    // Assert
    expect(result.status).toBe(CharacterStatus.FAIL);
    expect(result.errorMessage).toContain('Digimon API: 400');
  });
}); 