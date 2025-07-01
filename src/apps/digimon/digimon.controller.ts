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
import { GetCharacterDataUseCase } from 'src/modules/common/use-cases/get-character-data.usecase';
import { routesV1 } from 'src/shared/constants/routes';
import { ValidateConfigPipe } from 'src/shared/pipes/config/validate-config.pipe';
import { ValidateDigimonMetadataPipe } from 'src/shared/pipes/metadata/validate-digimon-metadata.pipe';

@ApiTags(routesV1.api.digimon.apiTag)
@Controller(routesV1.api.digimon.root)
export class DigimonController {
  constructor(
    private readonly getCharacterDataUseCase: GetCharacterDataUseCase,
  ) {}

  @Get(routesV1.api.digimon.findOne)
  @ApiOperation({
    summary: 'Obtain information about a Digimon',
    description:
      'Obtains detailed information about a Digimon including powers and evolutions.',
  })
  @ApiQuery({
    name: 'metadata',
    description: 'Digimon metadata (JSON)',
    example: '{"id":42}',
  })
  @ApiQuery({
    name: 'config',
    description: 'External API configuration (JSON)',
    example: '{"baseUrl":"https://digi-api.com/api/v1"}',
  })
  @ApiResponse({
    status: 200,
    description: 'Digimon information obtained successfully',
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
    description: 'Error interno del servidor',
  })
  async getDigimonData(
    @Query('metadata', ValidateDigimonMetadataPipe) metadata: any,
    @Query('config', ValidateConfigPipe) config: any,
  ) {
    const characterEntityDto = await this.getCharacterDataUseCase.execute(
      routesV1.version,
      metadata,
      config,
    );
    return CharacterMapper.toResponseDto(characterEntityDto);
  }
}
