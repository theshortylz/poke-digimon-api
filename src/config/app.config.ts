export default () => ({
  swagger: {
    title: 'API Pokémon And Digimon',
    description: 'Documentation for the REST API for Pokémon and Digimon',
    version: '1.0',
    path: 'api-docs',
  },
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    name: process.env.DB_NAME || 'poke_digi.sqlite',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
});
