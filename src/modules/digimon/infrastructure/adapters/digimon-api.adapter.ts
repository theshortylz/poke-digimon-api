import { DigimonPort } from '../../domain/ports/digimon-port';
import axios from 'axios';
import {
  CharacterEntityDto,
  CharacterMapper,
} from '../../../common/models/dto/character.dto';
import { Franchise } from '../../../../shared/enums/franchise.enum';
import { BaseApiAdapter } from 'src/modules/common/adapters/base-api.adapter';
import { CharacterStatus } from 'src/shared/enums/character-status.enum';
import { Logger } from '@nestjs/common';

export class DigimonApiAdapter extends BaseApiAdapter implements DigimonPort {
  private readonly logger = new Logger(DigimonApiAdapter.name);
  private readonly franchise = Franchise.DIGIMON;

  async getData(metadata: string, config: string): Promise<CharacterEntityDto> {
    const { metadataObj, configObj } = this.parseMetadataAndConfig(
      metadata,
      config,
    );

    const { id } = metadataObj;
    const { baseUrl } = configObj;

    try {
      const digimon = await this.fetchDigimon(baseUrl, id);
      return CharacterMapper.fromDigimon(
        digimon,
        CharacterStatus.SUCCESS,
        null,
      );
    } catch (error: any) {
      this.logger.error(
        `An error occurred while getting data from digimon API: ${error.message}`,
        error,
      );

      return CharacterMapper.fromDigimon(
        { name: '', skills: [], priorEvolutions: [], nextEvolutions: [] },
        CharacterStatus.FAIL,
        this.formatErrorMessage(error),
      );
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
