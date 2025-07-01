import { Test, TestingModule } from '@nestjs/testing';
import { PokemonInputAdapter } from './pokemon-input.adapter';
import { GetPokemonDataUseCase } from '../use-cases/get-pokemon-data.usecase';
import { CharacterEntityDto } from 'src/modules/common/models/dto/character.dto';
import { CharacterStatus } from 'src/shared/enums/character-status.enum';

describe('PokemonInputAdapter', () => {
  let adapter: PokemonInputAdapter;
  let useCase: jest.Mocked<GetPokemonDataUseCase>;

  beforeEach(async () => {
    const mockUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PokemonInputAdapter,
          useFactory: () => new PokemonInputAdapter(mockUseCase as any),
        },
      ],
    }).compile();

    adapter = module.get<PokemonInputAdapter>(PokemonInputAdapter);
    useCase = mockUseCase as any;
  });

  it('should be defined', () => {
    expect(adapter).toBeDefined();
  });

  describe('execute', () => {
    it('should call use case execute method with correct parameters', async () => {
      // Arrange
      const version = 'v1';
      const metadata = { name: 'pikachu' };
      const config = { baseUrl: 'https://pokeapi.co/api/v2' };
      const expectedResult = new CharacterEntityDto(
        'pikachu',
        ['static', 'lightning-rod'],
        ['raichu'],
        60,
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
      const metadata = { name: 'invalid-pokemon' };
      const config = { baseUrl: 'https://pokeapi.co/api/v2' };
      const errorMessage = 'Pokemon not found';
      const expectedResult = new CharacterEntityDto(
        'invalid-pokemon',
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