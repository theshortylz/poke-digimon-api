export class InvalidFranchiseException extends Error {
  constructor(franchise: string) {
    super(
      `Franquicia no válida: ${franchise}. Valores permitidos: pokemon, digimon`,
    );
    this.name = 'InvalidFranchiseException';
  }
}

export class InvalidJsonException extends Error {
  constructor(field: string) {
    super(`Formato JSON inválido en el campo: ${field}`);
    this.name = 'InvalidJsonException';
  }
}

export class ExternalApiException extends Error {
  constructor(message: string) {
    super(`Error en API externa: ${message}`);
    this.name = 'ExternalApiException';
  }
}
