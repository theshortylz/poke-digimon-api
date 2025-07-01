import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiBadRequestResponse,
  ApiServiceUnavailableResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import {
  CharacterResponseDto,
  CharacterMapper,
} from 'src/modules/common/models/dto/character.dto';
import { GetPokemonDataUseCase } from 'src/modules/pokemon/application/use-cases/get-pokemon-data.usecase';
import { routesV1 } from 'src/shared/constants/routes';

@ApiTags(routesV1.api.pokemon.apiTag)
@Controller(routesV1.api.pokemon.root)
export class PokemonController {
  constructor(private readonly getPokemonDataUseCase: GetPokemonDataUseCase) {}

  @Get(routesV1.api.pokemon.findOne)
  @ApiOperation({
    summary: 'Obtain information about a Pokemon',
    description:
      'Obtains detailed information about a Pokemon including powers and evolutions.',
  })
  @ApiQuery({
    name: 'metadata',
    description: 'Pokemon metadata (JSON)',
    example: '{"name":"pikachu"}',
  })
  @ApiQuery({
    name: 'config',
    description: 'External API configuration (JSON)',
    example: '{"baseUrl":"https://pokeapi.co/api/v2"}',
  })
  @ApiResponse({
    status: 200,
    description: 'Pokemon information obtained successfully',
    type: CharacterResponseDto,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid parameters',
  })
  @ApiServiceUnavailableResponse({
    status: HttpStatus.SERVICE_UNAVAILABLE,
    description: 'External API unavailable',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async getPokemonData(
    @Query('metadata') metadata: string,
    @Query('config') config: string,
  ) {
    const characterEntityDto = await this.getPokemonDataUseCase.execute(
      routesV1.version,
      metadata,
      config,
    );
    return CharacterMapper.toResponseDto(characterEntityDto);
  }
}
