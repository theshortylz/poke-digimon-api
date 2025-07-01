import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidatePokemonMetadataPipe implements PipeTransform {
  transform(value: any) {
    let parsed;
    try {
      parsed = JSON.parse(value);
    } catch {
      throw new BadRequestException(
        "El parámetro 'metadata' debe ser un JSON válido. Ejemplo: {'name':'pikachu'}",
      );
    }
    if (!parsed.name || typeof parsed.name !== 'string') {
      throw new BadRequestException(
        "El campo 'name' es obligatorio y debe ser string en metadata. Ejemplo: {'name':'pikachu'}",
      );
    }
    return parsed;
  }
}
