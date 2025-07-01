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
import { CharacterResponseDto, CharacterMapper } from 'src/modules/common/models/dto/character.dto';
import { GetDigimonDataUseCase } from 'src/modules/digimon/application/use-cases/get-digimon-data.usecase';
import { routesV1 } from 'src/shared/constants/routes';

@ApiTags(routesV1.api.digimon.apiTag)
@Controller(routesV1.api.digimon.root)
export class DigimonController {
  constructor(private readonly getDigimonDataUseCase: GetDigimonDataUseCase) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener información de un Digimon',
    description:
      'Obtiene información detallada de un Digimon incluyendo poderes y evoluciones.',
  })
  @ApiQuery({
    name: 'metadata',
    description: 'Metadatos del Digimon (JSON)',
    example: '{"id":42}',
  })
  @ApiQuery({
    name: 'config',
    description: 'Configuración para la API externa (JSON)',
    example: '{"baseUrl":"https://digi-api.com/api/v1"}',
  })
  @ApiResponse({
    status: 200,
    description: 'Información del Digimon obtenida exitosamente',
    type: CharacterResponseDto,
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
