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
import { CharacterEntityDto } from 'src/modules/common/models/dto/character.dto';
import { CharacterStatus } from 'src/shared/enums/character-status.enum';
import { Franchise } from 'src/shared/enums/franchise.enum';

@Injectable()
export class TypeormStorageAdapter implements StoragePort {
  constructor(
    @InjectRepository(CharacterEntity)
    private readonly repo: Repository<CharacterEntity>,
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
  }

  async getAll(): Promise<CharacterEntity[]> {
    try {
      const existsStorage = await this.repo.find();

      if (existsStorage.length === 0) {
        throw new NotFoundException('No data found on storage');
      }

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
