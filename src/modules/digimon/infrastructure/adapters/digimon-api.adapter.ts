import { DigimonPort } from '../../domain/ports/digimon-port';
import axios from 'axios';
import { CharacterDto } from '../../../../domain/dto/character.dto';
import { ExternalApiException } from 'src/shared/errors/custom-exceptions';
import { BaseApiAdapter } from '../../../../infrastructure/adapters/common/base-api.adapter';

export class DigimonApiAdapter extends BaseApiAdapter implements DigimonPort {
  async getData(metadata: string, config: string): Promise<CharacterDto> {
    try {
      // Parsear metadata y config usando el método heredado
      const { metadataObj, configObj } = this.parseMetadataAndConfig(
        metadata,
        config,
      );
      const { id } = metadataObj;
      const { baseUrl } = configObj;

      // 1. Obtener datos del Digimon
      const digimonUrl = `${baseUrl}/digimon/${id}`;

      let digimonResponse;

      try {
        digimonResponse = await axios.get(digimonUrl);
      } catch (error) {
        if (error.response) {
          throw new ExternalApiException(
            `Digimon API: ${error.response.status} - ${error.response.statusText}`,
          );
        }

        throw new ExternalApiException(`Digimon API: ${error.message}`);
      }

      const digimon = digimonResponse.data;

      // Retornar usando CharacterDto
      return CharacterDto.fromDigimon(digimon);
    } catch (error) {
      if (error instanceof ExternalApiException) {
        throw error;
      }
      throw new ExternalApiException(`Digimon API: ${error.message}`);
    }
  }
}
