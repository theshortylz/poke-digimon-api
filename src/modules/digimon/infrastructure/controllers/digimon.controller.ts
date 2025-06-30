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
import { GetDigimonDataUseCase } from '../../application/use-cases/get-digimon-data.usecase';
import { DigimonApiAdapter } from '../adapters/digimon-api.adapter';
import { InMemoryStorageAdapter } from '../../../../infrastructure/adapters/storage.adapter';
import { routesV1 } from '../../../../shared/constants/routes';
import { CharacterDto } from 'src/domain/dto/character.dto';

@ApiTags(routesV1.api.digimon.apiTag)
@Controller(routesV1.api.digimon.root)
export class DigimonController {
  private storageAdapter = new InMemoryStorageAdapter();

  constructor(private readonly digimonAdapter: DigimonApiAdapter) {}

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
  async getDigimonData(
    @Query('metadata') metadata: string,
    @Query('config') config: string,
  ) {
    const useCase = new GetDigimonDataUseCase(
      this.digimonAdapter,
      this.storageAdapter,
    );

    const data = await useCase.execute(routesV1.version, metadata, config);

    return data;
  }
}
