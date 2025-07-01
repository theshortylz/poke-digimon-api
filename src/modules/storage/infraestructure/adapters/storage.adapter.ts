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
    // Extraer solo los datos del personaje (sin status y errorMessage)
    const characterData = {
      name: data.name,
      weight: data.weight,
      powers: data.powers,
      evolutions: data.evolutions,
    };

    const entity = this.repo.create({
      franquicia,
      version,
      metadata: JSON.stringify(metadata),
      config: JSON.stringify(config),
      data: JSON.stringify(characterData),
      status: data.status,
      errorMessage: data.errorMessage,
      timestamp: new Date().toISOString(),
    });
    await this.repo.save(entity);
  }

  async getAll(): Promise<any[]> {
    const records = await this.repo.find();
    return records.map((r) => ({
      id: r.id,
      franquicia: r.franquicia,
      version: r.version,
      metadata: JSON.parse(r.metadata),
      config: JSON.parse(r.config),
      data: JSON.parse(r.data),
      status: r.status,
      errorMessage: r.errorMessage,
      timestamp: r.timestamp,
    }));
  }
}
