import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharacterEntity } from '../../domain/models/entities/character.entity';
import { StoragePort } from '../../domain/ports/storage-port';

@Injectable()
export class TypeormStorageAdapter implements StoragePort {
  constructor(
    @InjectRepository(CharacterEntity)
    private readonly repo: Repository<CharacterEntity>,
  ) {}

  async save(
    franquicia: string,
    version: string,
    metadata: any,
    config: any,
    data: any,
  ): Promise<void> {
    const entity = this.repo.create({
      franquicia,
      version,
      metadata: JSON.stringify(metadata),
      config: JSON.stringify(config),
      data: JSON.stringify(data),
      timestamp: new Date().toISOString(),
    });
    await this.repo.save(entity);
  }

  async getAll(): Promise<any[]> {
    const records = await this.repo.find();
    return records.map((r) => ({
      ...r,
      metadata: JSON.parse(r.metadata),
      config: JSON.parse(r.config),
      data: JSON.parse(r.data),
    }));
  }
}
