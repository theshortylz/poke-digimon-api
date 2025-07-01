import { ApiPort } from 'src/modules/common/ports/api-port';

// Pokémon-specific port that extends base functionality
// We use extends to be explicit about inheritance, even though we don't add additional methods
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PokemonPort extends ApiPort {
  // Pokémon-specific methods can be added here if needed
}
