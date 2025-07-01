import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateDigimonMetadataPipe implements PipeTransform {
  transform(value: any) {
    let parsed;
    try {
      parsed = JSON.parse(value);
    } catch {
      throw new BadRequestException(
        "El parámetro 'metadata' debe ser un JSON válido. Ejemplo: {'id':42}",
      );
    }
    if (typeof parsed.id !== 'number' || Number.isNaN(parsed.id)) {
      throw new BadRequestException(
        "El campo 'id' es obligatorio y debe ser un número en metadata. Ejemplo: {'id':42}",
      );
    }
    return parsed;
  }
}
