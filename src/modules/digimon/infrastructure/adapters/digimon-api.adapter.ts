import { DigimonPort } from '../../domain/ports/digimon-port';
import axios from 'axios';
import { CharacterDto } from '../../../common/models/dto/character.dto';
import { Franchise } from '../../../../shared/enums/franchise.enum';
import { ExternalApiException } from 'src/shared/errors/custom-exceptions';
import { BaseApiAdapter } from 'src/modules/common/adapters/base-api.adapter';

export class DigimonApiAdapter extends BaseApiAdapter implements DigimonPort {
  private readonly franchise = Franchise.DIGIMON;

  async getData(metadata: string, config: string): Promise<CharacterDto> {
    const { metadataObj, configObj } = this.parseMetadataAndConfig(
      metadata,
      config,
    );

    const { id } = metadataObj;
    const { baseUrl } = configObj;

    try {
      const digimon = await this.fetchDigimon(baseUrl, id);
      return CharacterDto.fromDigimon(digimon);
    } catch (error: any) {
      throw new ExternalApiException(this.formatErrorMessage(error));
    }
  }

  private async fetchDigimon(baseUrl: string, id: string | number) {
    const url = `${baseUrl}/${this.franchise}/${id}`;
    const { data } = await axios.get(url);
    return data;
  }

  private formatErrorMessage(error: any): string {
    return error?.response
      ? `Digimon API: ${error.response.status} - ${error.response.statusText}`
      : `Digimon API: ${error.message}`;
  }
}
