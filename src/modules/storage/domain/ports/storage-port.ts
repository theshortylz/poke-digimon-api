import { CharacterEntityDto } from 'src/modules/common/models/dto/character.dto';
import { CharacterEntity } from '../models/entities/character.entity';

export interface StoragePort {
  save(
    franchise: string,
    version: string,
    metadata: any,
    config: any,
    data: CharacterEntityDto,
  ): Promise<void>;
  getAll(): Promise<CharacterEntity[]>;
}
