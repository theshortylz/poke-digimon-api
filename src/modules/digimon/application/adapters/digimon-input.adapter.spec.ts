import { Test, TestingModule } from '@nestjs/testing';
import { DigimonInputAdapter } from './digimon-input.adapter';
import { GetDigimonDataUseCase } from '../use-cases/get-digimon-data.usecase';
import { CharacterEntityDto } from 'src/modules/common/models/dto/character.dto';
import { CharacterStatus } from 'src/shared/enums/character-status.enum';

describe('DigimonInputAdapter', () => {
  let adapter: DigimonInputAdapter;
  let useCase: jest.Mocked<GetDigimonDataUseCase>;

  beforeEach(async () => {
    const mockUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DigimonInputAdapter,
          useFactory: () => new DigimonInputAdapter(mockUseCase as any),
        },
      ],
    }).compile();

    adapter = module.get<DigimonInputAdapter>(DigimonInputAdapter);
    useCase = mockUseCase as any;
  });

  it('should be defined', () => {
    expect(adapter).toBeDefined();
  });

  describe('execute', () => {
    it('should call use case execute method with correct parameters', async () => {
      // Arrange
      const version = 'v1';
      const metadata = { id: 42 };
      const config = { baseUrl: 'https://digi-api.com/api/v1' };
      const expectedResult = new CharacterEntityDto(
        'Agumon',
        ['Pepper Breath', 'Sharp Claws'],
        ['Greymon', 'SkullGreymon'],
        undefined,
        CharacterStatus.SUCCESS,
      );

      useCase.execute.mockResolvedValue(expectedResult);

      // Act
      const result = await adapter.execute(version, metadata, config);

      // Assert
      expect(useCase.execute).toHaveBeenCalledWith(version, metadata, config);
      expect(result).toEqual(expectedResult);
    });

    it('should handle use case errors', async () => {
      // Arrange
      const version = 'v1';
      const metadata = { id: 9999 };
      const config = { baseUrl: 'https://digi-api.com/api/v1' };
      const errorMessage = 'Digimon not found';
      const expectedResult = new CharacterEntityDto(
        '',
        [],
        [],
        undefined,
        CharacterStatus.FAIL,
        errorMessage,
      );

      useCase.execute.mockResolvedValue(expectedResult);

      // Act
      const result = await adapter.execute(version, metadata, config);

      // Assert
      expect(useCase.execute).toHaveBeenCalledWith(version, metadata, config);
      expect(result.status).toBe(CharacterStatus.FAIL);
      expect(result.errorMessage).toBe(errorMessage);
    });
  });
});
