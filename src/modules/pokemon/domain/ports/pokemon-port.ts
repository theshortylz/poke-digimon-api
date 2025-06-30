import { ApiPort } from '../../../../domain/ports/api-port';

// Puerto específico para Pokémon que extiende la funcionalidad base
// Usamos extends para ser explícitos sobre la herencia, aunque no agreguemos métodos adicionales
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PokemonPort extends ApiPort {
  // Métodos específicos de Pokémon pueden agregarse aquí si es necesario
}
