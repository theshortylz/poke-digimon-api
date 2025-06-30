import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../../shared/errors/error-response.dto';
import { routesV1 } from '../../shared/constants/routes';
import { InMemoryStorageAdapter } from '../adapters/storage.adapter';

@ApiTags(routesV1.api.storage.apiTag)
@Controller(routesV1.api.storage.root)
export class StorageController {
  private storageAdapter = new InMemoryStorageAdapter();

  @Get('all')
  @ApiOperation({
    summary: 'Obtener historial de consultas',
    description:
      'Obtiene todas las consultas realizadas almacenadas en el sistema.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Historial de consultas obtenido exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          franquicia: { type: 'string' },
          version: { type: 'string' },
          metadata: { type: 'object' },
          config: { type: 'object' },
          data: { type: 'object' },
          timestamp: { type: 'string' },
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Error interno del servidor',
    type: ErrorResponseDto,
  })
  async getAllStoredData() {
    try {
      return await this.storageAdapter.getAll();
    } catch (error) {
      console.error('Error al obtener datos almacenados:', error);
      throw new HttpException(
        'Error al obtener datos almacenados',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
