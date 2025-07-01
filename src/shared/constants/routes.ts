// API Versions
const v1 = 'v1';

// Base routes
const api = 'api';
const pokemon = 'pokemon';
const digimon = 'digimon';
const storage = 'storage';

// Centralized routes structure
export const routesV1 = {
  version: v1,
  api: {
    root: api,
    pokemon: {
      apiTag: 'Pokémon',
      root: `${api}/${pokemon}/${v1}`,
      findOne: `/find-pokemon`,
    },
    digimon: {
      apiTag: 'Digimon',
      root: `${api}/${digimon}/${v1}`,
      findOne: `/find-digimon`,
    },
    storage: {
      apiTag: 'Storage',
      root: `${api}/${storage}/${v1}`,
      findAll: `/find-all-storage`,
    },
  },
};
