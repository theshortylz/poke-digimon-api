export interface ApiConfig {
  baseUrl: string;
  apiKey?: string;
  headers?: Record<string, string>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PokemonConfig extends ApiConfig {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DigimonConfig extends ApiConfig {}

export interface PokemonMetadata {
  name: string;
}

export interface DigimonMetadata {
  id: number;
}
