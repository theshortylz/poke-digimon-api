import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiBadRequestResponse,
  ApiServiceUnavailableResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { GetPokemonDataUseCase } from '../../application/use-cases/get-pokemon-data.usecase';
import { PokemonApiAdapter } from '../adapters/pokemon-api.adapter';
import { InMemoryStorageAdapter } from '../../../../infrastructure/adapters/storage.adapter';
import { routesV1 } from '../../../../shared/constants/routes';
import { CharacterDto } from 'src/domain/dto/character.dto';

@ApiTags(routesV1.api.pokemon.apiTag)
@Controller(routesV1.api.pokemon.root)
export class PokemonController {
  private storageAdapter = new InMemoryStorageAdapter();

  constructor(private readonly pokemonAdapter: PokemonApiAdapter) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener información de un Pokémon',
    description:
      'Obtiene información detallada de un Pokémon incluyendo poderes y evoluciones.',
  })
  @ApiQuery({
    name: 'metadata',
    description: 'Metadatos del Pokémon (JSON)',
    example: '{"name":"pikachu"}',
  })
  @ApiQuery({
    name: 'config',
    description: 'Configuración para la API externa (JSON)',
    example: '{"baseUrl":"https://pokeapi.co/api/v2"}',
  })
  @ApiResponse({
    status: 200,
    description: 'Información del Pokémon obtenida exitosamente',
    type: CharacterDto,
  })
  @ApiBadRequestResponse({
    description: 'Parámetros inválidos',
  })
  @ApiServiceUnavailableResponse({
    description: 'API externa no disponible',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error interno del servidor',
  })
  async getPokemonData(
    @Query('metadata') metadata: string,
    @Query('config') config: string,
  ) {
    const useCase = new GetPokemonDataUseCase(
      this.pokemonAdapter,
      this.storageAdapter,
    );

    const data = await useCase.execute(routesV1.version, metadata, config);

    return data;
  }
}
