import { Controller, Get, HttpStatus, Query, Inject } from '@nestjs/common';
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
import { routesV1 } from 'src/shared/constants/routes';
import { ValidateConfigPipe } from 'src/shared/pipes/config/validate-config.pipe';
import { ValidatePokemonMetadataPipe } from 'src/shared/pipes/metadata/validate-pokemon-metadata.pipe';
import { PokemonInputPort } from 'src/modules/pokemon/domain/ports/pokemon-input-port';
import { INJECTION_TOKENS } from 'src/config/injection-tokens.config';

@ApiTags(routesV1.api.pokemon.apiTag)
@Controller(routesV1.api.pokemon.root)
export class PokemonController {
  constructor(
    @Inject(INJECTION_TOKENS.POKEMON_INPUT_PORT)
    private readonly pokemonInputPort: PokemonInputPort,
  ) {}

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
    description: 'Invalid parameters',
  })
  @ApiServiceUnavailableResponse({
    description: 'External API unavailable',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async getPokemonData(
    @Query('metadata', ValidatePokemonMetadataPipe) metadata: any,
    @Query('config', ValidateConfigPipe) config: any,
  ) {
    const characterEntityDto = await this.pokemonInputPort.execute(
      routesV1.version,
      metadata,
      config,
    );
    return CharacterMapper.toResponseDto(characterEntityDto);
  }
}
