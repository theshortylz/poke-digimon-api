import { DigimonInputPort } from '../../domain/ports/digimon-input-port';
import { CharacterEntityDto } from 'src/modules/common/models/dto/character.dto';
import { GetDigimonDataUseCase } from '../use-cases/get-digimon-data.usecase';

export class DigimonInputAdapter implements DigimonInputPort {
  constructor(private readonly getDigimonDataUseCase: GetDigimonDataUseCase) {}

  async execute(
    version: string,
    metadata: any,
    config: any,
  ): Promise<CharacterEntityDto> {
    return await this.getDigimonDataUseCase.execute(version, metadata, config);
  }
}
