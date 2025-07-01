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
import { GetDigimonDataUseCase } from 'src/modules/digimon/application/use-cases/get-digimon-data.usecase';
import { routesV1 } from 'src/shared/constants/routes';

@ApiTags(routesV1.api.digimon.apiTag)
@Controller(routesV1.api.digimon.root)
export class DigimonController {
  constructor(private readonly getDigimonDataUseCase: GetDigimonDataUseCase) {}

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
    @Query('metadata') metadata: string,
    @Query('config') config: string,
  ) {
    const characterEntityDto = await this.getDigimonDataUseCase.execute(
      routesV1.version,
      metadata,
      config,
    );
    return CharacterMapper.toResponseDto(characterEntityDto);
  }
}
