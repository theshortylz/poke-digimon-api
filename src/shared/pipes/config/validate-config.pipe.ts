import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateConfigPipe implements PipeTransform {
  transform(value: any) {
    let parsed;
    try {
      parsed = JSON.parse(value);
    } catch {
      throw new BadRequestException(
        "El parámetro 'config' debe ser un JSON válido. Ejemplo: {'baseUrl':'https://api.example.com'}",
      );
    }
    if (!parsed.baseUrl || typeof parsed.baseUrl !== 'string') {
      throw new BadRequestException(
        "El campo 'baseUrl' es obligatorio y debe ser string en config. Ejemplo: {'baseUrl':'https://api.example.com'}",
      );
    }
    return parsed;
  }
}
