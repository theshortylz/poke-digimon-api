import { CharacterEntityDto } from '../models/dto/character.dto';

export interface InputPort {
  execute(
    version: string,
    metadata: any,
    config: any,
  ): Promise<CharacterEntityDto>;
} 