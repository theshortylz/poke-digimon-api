import { CharacterEntityDto } from '../models/dto/character.dto';

export interface GetCharacterStrategy {
  getData(metadata: string, config: string): Promise<CharacterEntityDto>;
}
