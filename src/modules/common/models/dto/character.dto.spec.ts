import { CharacterMapper, CharacterResponseDto, CharacterEntityDto } from './character.dto';
import { CharacterStatus } from 'src/shared/enums/character-status.enum';

describe('CharacterMapper', () => {
  describe('toResponseDto', () => {
    it('should convert CharacterEntityDto to CharacterResponseDto', () => {
      // Arrange
      const entityDto = new CharacterEntityDto(
        'pikachu',
        ['static', 'lightning-rod'],
        ['raichu'],
        60,
        CharacterStatus.SUCCESS,
        null,
      );

      // Act
      const result = CharacterMapper.toResponseDto(entityDto);

      // Assert
      expect(result).toBeInstanceOf(CharacterResponseDto);
      expect(result.name).toBe('pikachu');
      expect(result.powers).toEqual(['static', 'lightning-rod']);
      expect(result.evolutions).toEqual(['raichu']);
      expect(result.weight).toBe(60);
      expect(result).not.toHaveProperty('status');
      expect(result).not.toHaveProperty('errorMessage');
    });
  });

  describe('toEntityDto', () => {
    it('should convert CharacterResponseDto to CharacterEntityDto with default values', () => {
      // Arrange
      const responseDto = new CharacterResponseDto(
        'pikachu',
        ['static', 'lightning-rod'],
        ['raichu'],
        60,
      );

      // Act
      const result = CharacterMapper.toEntityDto(responseDto);

      // Assert
      expect(result).toBeInstanceOf(CharacterEntityDto);
      expect(result.name).toBe('pikachu');
      expect(result.powers).toEqual(['static', 'lightning-rod']);
      expect(result.evolutions).toEqual(['raichu']);
      expect(result.weight).toBe(60);
      expect(result.status).toBe(CharacterStatus.SUCCESS);
      expect(result.errorMessage).toBeUndefined();
    });

    it('should convert CharacterResponseDto to CharacterEntityDto with custom status and error', () => {
      // Arrange
      const responseDto = new CharacterResponseDto(
        'invalid-pokemon',
        [],
        [],
        undefined,
      );
      const customStatus = CharacterStatus.FAIL;
      const errorMessage = 'Pokemon not found';

      // Act
      const result = CharacterMapper.toEntityDto(responseDto, customStatus, errorMessage);

      // Assert
      expect(result).toBeInstanceOf(CharacterEntityDto);
      expect(result.name).toBe('invalid-pokemon');
      expect(result.powers).toEqual([]);
      expect(result.evolutions).toEqual([]);
      expect(result.weight).toBeUndefined();
      expect(result.status).toBe(CharacterStatus.FAIL);
      expect(result.errorMessage).toBe('Pokemon not found');
    });
  });

  describe('fromPokemon', () => {
    it('should create CharacterEntityDto from Pokemon data', () => {
      // Arrange
      const pokemonData = {
        name: 'pikachu',
        abilities: [
          { ability: { name: 'static' } },
          { ability: { name: 'lightning-rod' } },
        ],
        weight: 60,
      };
      const evolutions = ['raichu'];

      // Act
      const result = CharacterMapper.fromPokemon(pokemonData, evolutions);

      // Assert
      expect(result).toBeInstanceOf(CharacterEntityDto);
      expect(result.name).toBe('pikachu');
      expect(result.powers).toEqual(['static', 'lightning-rod']);
      expect(result.evolutions).toEqual(['raichu']);
      expect(result.weight).toBe(60);
      expect(result.status).toBe(CharacterStatus.SUCCESS);
      expect(result.errorMessage).toBeUndefined();
    });

    it('should handle Pokemon data with missing abilities', () => {
      // Arrange
      const pokemonData = {
        name: 'pikachu',
        weight: 60,
      };
      const evolutions = ['raichu'];

      // Act
      const result = CharacterMapper.fromPokemon(pokemonData, evolutions);

      // Assert
      expect(result.powers).toEqual([]);
    });

    it('should create CharacterEntityDto with failure status', () => {
      // Arrange
      const pokemonData = {
        name: 'invalid-pokemon',
        abilities: [],
        weight: undefined,
      };
      const evolutions = [];
      const status = CharacterStatus.FAIL;
      const errorMessage = 'Pokemon not found';

      // Act
      const result = CharacterMapper.fromPokemon(pokemonData, evolutions, status, errorMessage);

      // Assert
      expect(result.status).toBe(CharacterStatus.FAIL);
      expect(result.errorMessage).toBe('Pokemon not found');
    });
  });

  describe('fromDigimon', () => {
    it('should create CharacterEntityDto from Digimon data', () => {
      // Arrange
      const digimonData = {
        name: 'Agumon',
        skills: [
          { skill: 'Pepper Breath' },
          { skill: 'Sharp Claws' },
        ],
        priorEvolutions: [
          { digimon: 'Botamon' },
        ],
        nextEvolutions: [
          { digimon: 'Greymon' },
          { digimon: 'SkullGreymon' },
        ],
      };

      // Act
      const result = CharacterMapper.fromDigimon(digimonData);

      // Assert
      expect(result).toBeInstanceOf(CharacterEntityDto);
      expect(result.name).toBe('Agumon');
      expect(result.powers).toEqual(['Pepper Breath', 'Sharp Claws']);
      expect(result.evolutions).toEqual(['Botamon', 'Greymon', 'SkullGreymon']);
      expect(result.weight).toBeUndefined();
      expect(result.status).toBe(CharacterStatus.SUCCESS);
      expect(result.errorMessage).toBeUndefined();
    });

    it('should handle Digimon data with missing skills and evolutions', () => {
      // Arrange
      const digimonData = {
        name: 'Agumon',
      };

      // Act
      const result = CharacterMapper.fromDigimon(digimonData);

      // Assert
      expect(result.powers).toEqual([]);
      expect(result.evolutions).toEqual([]);
    });
  });
}); 