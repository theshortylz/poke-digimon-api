import { ApiProperty } from '@nestjs/swagger';

export class CharacterDto {
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

  static fromPokemon(
    pokemonData: any,
    evolutions: string[] = [],
  ): CharacterDto {
    const powers =
      pokemonData.abilities?.map((ability: any) => ability.ability.name) || [];

    return new CharacterDto(
      pokemonData.name,
      powers,
      evolutions,
      pokemonData.weight,
    );
  }

  static fromDigimon(digimonData: any): CharacterDto {
    const powers = digimonData.skills?.map((skill: any) => skill.skill) || [];
    const evolutions = [
      ...(digimonData.priorEvolutions?.map(
        (evolution: any) => evolution.digimon,
      ) || []),
      ...(digimonData.nextEvolutions?.map(
        (evolution: any) => evolution.digimon,
      ) || []),
    ];

    return new CharacterDto(digimonData.name, powers, evolutions);
  }
}
