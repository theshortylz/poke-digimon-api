// Tokens de inyección centralizados
export const INJECTION_TOKENS = {
  DIGIMON_PORT: 'DigimonPort',
  POKEMON_PORT: 'PokemonPort',
  STORAGE_PORT: 'StoragePort',
};

// Providers centralizados (uno por puerto)
import { DigimonApiAdapter } from 'src/modules/digimon/infrastructure/adapters/digimon-api.adapter';
import { PokemonApiAdapter } from 'src/modules/pokemon/infrastructure/adapters/pokemon-api.adapter';
import { TypeormStorageAdapter } from 'src/modules/storage/infraestructure/adapters/storage.adapter';

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
