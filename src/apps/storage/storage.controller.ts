import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../../shared/errors/error-response.dto';
import { routesV1 } from '../../shared/constants/routes';
import { StoragePort } from 'src/modules/storage/domain/ports/storage-port';
import { CharacterEntity } from 'src/modules/storage/domain/models/entities/character.entity';

@ApiTags(routesV1.api.storage.apiTag)
@Controller(routesV1.api.storage.root)
export class StorageController {
  constructor(
    @Inject('StoragePort')
    private readonly storageAdapter: StoragePort,
  ) {}

  @Get(routesV1.api.storage.findAll)
  @ApiOperation({
    summary: 'Obtener historial de consultas',
    description:
      'Obtiene todas las consultas realizadas almacenadas en el sistema.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Historial de consultas obtenido exitosamente',
    type: [CharacterEntity],
  })
  @ApiInternalServerErrorResponse({
    description: 'Error interno del servidor',
    type: ErrorResponseDto,
  })
  async getAllStoredData() {
    return await this.storageAdapter.getAll();
  }
}
