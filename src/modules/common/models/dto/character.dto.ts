import { ApiProperty } from '@nestjs/swagger';
import { CharacterStatus } from 'src/shared/enums/character-status.enum';

// DTO for API response (without audit fields)
export class CharacterResponseDto {
  @ApiProperty({
    description: 'Nombre del personaje',
    example: 'Personaje 1',
  })
  name: string;

  @ApiProperty({
    description: 'Peso del personaje',
    example: 90,
    required: false,
  })
  weight?: number;

  @ApiProperty({
    description: 'Lista de poderes/habilidades del personaje',
    example: ['Ataque 1', 'Ataque 2'],
    type: [String],
  })
  powers: string[];

  @ApiProperty({
    description: 'Lista de evoluciones del personaje',
    example: ['Evolucion 1'],
    type: [String],
  })
  evolutions: string[];

  constructor(
    name: string,
    powers: string[],
    evolutions: string[],
    weight?: number,
  ) {
    this.name = name;
    this.powers = powers;
    this.evolutions = evolutions;
    this.weight = weight;
  }
}

// DTO for database entity (with audit fields)
export class CharacterEntityDto {
  @ApiProperty({
    description: 'Nombre del personaje',
    example: 'Personaje 1',
  })
  name: string;

  @ApiProperty({
    description: 'Peso del personaje',
    example: 90,
    required: false,
  })
  weight?: number;

  @ApiProperty({
    description: 'Lista de poderes/habilidades del personaje',
    example: ['Ataque 1', 'Ataque 2'],
    type: [String],
  })
  powers: string[];

  @ApiProperty({
    description: 'Lista de evoluciones del personaje',
    example: ['Evolucion 1'],
    type: [String],
  })
  evolutions: string[];

  @ApiProperty({
    description: 'Estado de la operación',
    example: CharacterStatus.SUCCESS,
    enum: CharacterStatus,
  })
  status: CharacterStatus;

  @ApiProperty({
    description: 'Mensaje de error si la operación falla',
    example: 'No se pudo obtener el personaje',
    required: false,
  })
  errorMessage?: string | null;

  constructor(
    name: string,
    powers: string[],
    evolutions: string[],
    weight?: number,
    status: CharacterStatus = CharacterStatus.SUCCESS,
    errorMessage?: string | null,
  ) {
    this.name = name;
    this.powers = powers;
    this.evolutions = evolutions;
    this.weight = weight;
    this.status = status;
    this.errorMessage = errorMessage;
  }
}

// Mapper to convert between DTOs
export class CharacterMapper {
  // Converts CharacterEntityDto to CharacterResponseDto (removes audit fields)
  static toResponseDto(entityDto: CharacterEntityDto): CharacterResponseDto {
    return new CharacterResponseDto(
      entityDto.name,
      entityDto.powers,
      entityDto.evolutions,
      entityDto.weight,
    );
  }

  // Converts CharacterResponseDto to CharacterEntityDto (adds audit fields)
  static toEntityDto(
    responseDto: CharacterResponseDto,
    status: CharacterStatus = CharacterStatus.SUCCESS,
    errorMessage?: string | null,
  ): CharacterEntityDto {
    return new CharacterEntityDto(
      responseDto.name,
      responseDto.powers,
      responseDto.evolutions,
      responseDto.weight,
      status,
      errorMessage,
    );
  }

  // Static methods to create DTOs from external data
  static fromPokemon(
    pokemonData: any,
    evolutions: string[] = [],
    status: CharacterStatus = CharacterStatus.SUCCESS,
    errorMessage?: string | null,
  ): CharacterEntityDto {
    const powers =
      pokemonData.abilities?.map((ability: any) => ability.ability.name) || [];

    return new CharacterEntityDto(
      pokemonData.name,
      powers,
      evolutions,
      pokemonData.weight,
      status,
      errorMessage,
    );
  }

  static fromDigimon(
    digimonData: any,
    status: CharacterStatus = CharacterStatus.SUCCESS,
    errorMessage?: string | null,
  ): CharacterEntityDto {
    const powers = digimonData.skills?.map((skill: any) => skill.skill) || [];
    const evolutions = [
      ...(digimonData.priorEvolutions?.map(
        (evolution: any) => evolution.digimon,
      ) || []),
      ...(digimonData.nextEvolutions?.map(
        (evolution: any) => evolution.digimon,
      ) || []),
    ];

    return new CharacterEntityDto(
      digimonData.name,
      powers,
      evolutions,
      undefined,
      status,
      errorMessage,
    );
  }
}
