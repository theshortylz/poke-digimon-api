import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharacterEntity } from '../../domain/models/entities/character.entity';
import { StoragePort } from '../../domain/ports/storage-port';
import { Franchise } from 'src/shared/enums/franchise.enum';
import { RedisCacheService } from 'src/modules/common/cache/redis-cache.module';
import { CACHE_KEYS } from 'src/shared/constants/cache-keys';

@Injectable()
export class TypeormStorageAdapter implements StoragePort {
  constructor(
    @InjectRepository(CharacterEntity)
    private readonly repo: Repository<CharacterEntity>,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  async save(
    franchise: string,
    version: string,
    metadata: any,
    config: any,
    data: any,
  ): Promise<void> {
    const entity = this.repo.create({
      franchise: franchise as Franchise,
      version: version,
      metadata: JSON.stringify(metadata),
      config: JSON.stringify(config),
      status: data.status,
      errorMessage: data.errorMessage,
      timestamp: new Date().toISOString(),
    });
    await this.repo.save(entity);

    // Invalidar el caché cuando se agrega un nuevo registro
    await this.redisCacheService.del(CACHE_KEYS.STORAGE.ALL_DATA.key);
  }

  async getAll(): Promise<CharacterEntity[]> {
    try {
      // Intentar obtener datos del caché primero
      const cachedData = await this.redisCacheService.get(
        CACHE_KEYS.STORAGE.ALL_DATA.key,
      );

      if (cachedData) {
        Logger.log('Data retrieved from cache');
        return JSON.parse(cachedData);
      }

      // Si no hay datos en caché, consultar la base de datos
      const existsStorage = await this.repo.find();

      if (existsStorage.length === 0) {
        throw new NotFoundException('No data found on storage');
      }

      // Guardar en caché por 5 minutos
      await this.redisCacheService.set(
        CACHE_KEYS.STORAGE.ALL_DATA.key,
        JSON.stringify(existsStorage),
        CACHE_KEYS.STORAGE.ALL_DATA.ttl,
      );

      Logger.log('Data retrieved from database and cached');

      return existsStorage;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      Logger.error(
        `An error occurred while getting all data from storage: ${error.message}`,
        error,
      );

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
