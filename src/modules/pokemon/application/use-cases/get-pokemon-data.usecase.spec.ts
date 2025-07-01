import { Test, TestingModule } from '@nestjs/testing';
import { GetPokemonDataUseCase } from './get-pokemon-data.usecase';
import { PokemonPort } from '../../domain/ports/pokemon-port';
import { StoragePort } from 'src/modules/storage/domain/ports/storage-port';
import { CharacterEntityDto } from 'src/modules/common/models/dto/character.dto';
import { CharacterStatus } from 'src/shared/enums/character-status.enum';
import { Franchise } from 'src/shared/enums/franchise.enum';
import { BadRequestException } from '@nestjs/common';
import { INJECTION_TOKENS } from 'src/config/injection-tokens.config';

describe('GetPokemonDataUseCase', () => {
  let useCase: GetPokemonDataUseCase;
  let pokemonPort: jest.Mocked<PokemonPort>;
  let storagePort: jest.Mocked<StoragePort>;

  beforeEach(async () => {
    const mockPokemonPort = {
      getData: jest.fn(),
    };

    const mockStoragePort = {
      save: jest.fn(),
      getAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPokemonDataUseCase,
        {
          provide: INJECTION_TOKENS.POKEMON_PORT,
          useValue: mockPokemonPort,
        },
        {
          provide: INJECTION_TOKENS.STORAGE_PORT,
          useValue: mockStoragePort,
        },
      ],
    }).compile();

    useCase = module.get<GetPokemonDataUseCase>(GetPokemonDataUseCase);
    pokemonPort = module.get(INJECTION_TOKENS.POKEMON_PORT);
    storagePort = module.get(INJECTION_TOKENS.STORAGE_PORT);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should successfully get pokemon data and save to storage', async () => {
      // Arrange
      const version = 'v1';
      const metadata = JSON.stringify({ name: 'pikachu' });
      const config = JSON.stringify({ baseUrl: 'https://pokeapi.co/api/v2' });
      const pokemonData = new CharacterEntityDto(
        'pikachu',
        ['static', 'lightning-rod'],
        ['raichu'],
        60,
        CharacterStatus.SUCCESS,
      );

      pokemonPort.getData.mockResolvedValue(pokemonData);
      storagePort.save.mockResolvedValue();

      // Act
      const result = await useCase.execute(version, metadata, config);

      // Assert
      expect(pokemonPort.getData).toHaveBeenCalledWith(metadata, config);
      expect(storagePort.save).toHaveBeenCalledWith(
        Franchise.POKEMON,
        version,
        metadata,
        config,
        pokemonData,
      );
      expect(result).toEqual(pokemonData);
    });

    it('should throw BadRequestException when pokemon data fails', async () => {
      // Arrange
      const version = 'v1';
      const metadata = JSON.stringify({ name: 'invalid-pokemon' });
      const config = JSON.stringify({ baseUrl: 'https://pokeapi.co/api/v2' });
      const errorMessage = 'Pokemon not found';
      const failedData = new CharacterEntityDto(
        'invalid-pokemon',
        [],
        [],
        undefined,
        CharacterStatus.FAIL,
        errorMessage,
      );

      pokemonPort.getData.mockResolvedValue(failedData);
      storagePort.save.mockResolvedValue();

      // Act & Assert
      await expect(useCase.execute(version, metadata, config)).rejects.toThrow(
        BadRequestException,
      );
      expect(pokemonPort.getData).toHaveBeenCalledWith(metadata, config);
      expect(storagePort.save).toHaveBeenCalledWith(
        Franchise.POKEMON,
        version,
        metadata,
        config,
        failedData,
      );
    });

    it('should handle pokemon port errors', async () => {
      // Arrange
      const version = 'v1';
      const metadata = JSON.stringify({ name: 'pikachu' });
      const config = JSON.stringify({ baseUrl: 'https://pokeapi.co/api/v2' });
      const error = new Error('Network error');

      pokemonPort.getData.mockRejectedValue(error);

      // Act & Assert
      await expect(useCase.execute(version, metadata, config)).rejects.toThrow(
        'Network error',
      );
      expect(pokemonPort.getData).toHaveBeenCalledWith(metadata, config);
      expect(storagePort.save).not.toHaveBeenCalled();
    });
  });
}); 