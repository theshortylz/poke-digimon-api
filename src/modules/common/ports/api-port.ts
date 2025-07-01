import { CharacterEntityDto } from '../models/dto/character.dto';

export interface ApiPort {
  getData(metadata: string, config: string): Promise<CharacterEntityDto>;
}
