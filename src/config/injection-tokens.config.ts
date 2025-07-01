// Centralized injection tokens
export const INJECTION_TOKENS = {
  DIGIMON_PORT: 'DigimonPort',
  POKEMON_PORT: 'PokemonPort',
  STORAGE_PORT: 'StoragePort',
  REDIS_CLIENT: 'RedisClient',
  // Input ports
  POKEMON_INPUT_PORT: 'PokemonInputPort',
  DIGIMON_INPUT_PORT: 'DigimonInputPort',
};

// Centralized providers (one per port)
import { DigimonApiAdapter } from 'src/modules/digimon/infrastructure/adapters/digimon-api.adapter';
import { PokemonApiAdapter } from 'src/modules/pokemon/infrastructure/adapters/pokemon-api.adapter';
import { TypeormStorageAdapter } from 'src/modules/storage/infraestructure/adapters/storage.adapter';
import { PokemonInputAdapter } from 'src/modules/pokemon/application/adapters/pokemon-input.adapter';
import { DigimonInputAdapter } from 'src/modules/digimon/application/adapters/digimon-input.adapter';

export const DigimonPortProvider = {
  provide: INJECTION_TOKENS.DIGIMON_PORT,
  useClass: DigimonApiAdapter,
};

export const PokemonPortProvider = {
  provide: INJECTION_TOKENS.POKEMON_PORT,
  useClass: PokemonApiAdapter,
};

export const StoragePortProvider = {
  provide: INJECTION_TOKENS.STORAGE_PORT,
  useClass: TypeormStorageAdapter,
};

// Input port providers
export const PokemonInputPortProvider = {
  provide: INJECTION_TOKENS.POKEMON_INPUT_PORT,
  useClass: PokemonInputAdapter,
};

export const DigimonInputPortProvider = {
  provide: INJECTION_TOKENS.DIGIMON_INPUT_PORT,
  useClass: DigimonInputAdapter,
};
