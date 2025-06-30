import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Código de estado HTTP',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensaje de error',
    example:
      'Franquicia no válida: invalid. Valores permitidos: pokemon, digimon',
  })
  message: string;

  @ApiProperty({
    description: 'Tipo de error',
    example: 'Bad Request',
  })
  error: string;
}
