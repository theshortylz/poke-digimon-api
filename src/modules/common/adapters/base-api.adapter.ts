import { InvalidJsonException } from 'src/shared/errors/custom-exceptions';

export abstract class BaseApiAdapter {
  protected parseJson(jsonString: string, fieldName: string): any {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      throw new InvalidJsonException(fieldName);
    }
  }

  protected parseMetadataAndConfig(
    metadata: string,
    config: string,
  ): {
    metadataObj: any;
    configObj: any;
  } {
    const metadataObj = this.parseJson(metadata, 'metadata');
    const configObj = this.parseJson(config, 'config');

    return { metadataObj, configObj };
  }
}
