import { InvalidJsonException } from 'src/shared/errors/custom-exceptions';

export abstract class BaseApiAdapter {
  protected parseJson(jsonInput: string | any, fieldName: string): any {
    // Si ya es un objeto, devolverlo directamente
    if (typeof jsonInput === 'object' && jsonInput !== null) {
      return jsonInput;
    }

    // Si es un string, intentar parsearlo
    if (typeof jsonInput === 'string') {
      try {
        return JSON.parse(jsonInput);
      } catch (error) {
        throw new InvalidJsonException(fieldName);
      }
    }

    throw new InvalidJsonException(fieldName);
  }

  protected parseMetadataAndConfig(
    metadata: string | any,
    config: string | any,
  ): {
    metadataObj: any;
    configObj: any;
  } {
    const metadataObj = this.parseJson(metadata, 'metadata');
    const configObj = this.parseJson(config, 'config');

    return { metadataObj, configObj };
  }
}
