import { CharacterDto } from '../dto/character.dto';

export interface ApiPort {
  getData(metadata: string, config: string): Promise<CharacterDto>;
}
