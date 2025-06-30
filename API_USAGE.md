# API de Pokémon y Digimon

Esta API REST permite obtener información de las franquicias de Pokémon y Digimon usando arquitectura hexagonal y modular.

## Documentación Interactiva

Accede a la documentación completa de Swagger en:
```
http://localhost:3000/api-docs
```

## Endpoints

### GET /v1/api/:franquicia

Obtiene información de un personaje específico de una franquicia.

**Parámetros de ruta:**
- `franquicia`: "pokemon" o "digimon" (enum validado)

**Parámetros de consulta:**
- `metadata`: Objeto JSON con información específica de la franquicia
- `config`: Objeto JSON con configuración para la API externa

### GET /v1/api/storage/all

Obtiene todos los resultados almacenados de las solicitudes realizadas.

## Ejemplos de uso

### Pokémon

```bash
GET /v1/api/pokemon?metadata={"name":"pikachu"}&config={"baseUrl":"https://pokeapi.co/api/v2"}
```

**Respuesta:**
```json
{
  "data": {
    "name": "pikachu",
    "weight": 60,
    "powers": ["static", "lightning-rod"],
    "evolutions": ["raichu"]
  },
  "version": "v1",
  "franquicia": "pokemon",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Digimon

```bash
GET /v1/api/digimon?metadata={"id":42}&config={"baseUrl":"https://digi-api.com/api/v1"}
```

**Respuesta:**
```json
{
  "data": {
    "name": "agumon",
    "powers": ["pepper breath", "claw attack"],
    "evolutions": ["greymon", "metal-greymon"]
  },
  "version": "v1",
  "franquicia": "digimon",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## URLs de APIs externas

- **Pokémon**: https://pokeapi.co/
- **Digimon**: https://digi-api.com/

## Estructura de respuesta estándar

Todos los personajes retornan la misma estructura:

```json
{
  "name": "string",
  "weight": "number (solo Pokémon)",
  "powers": ["string[]"],
  "evolutions": ["string[]"]
}
```

## Códigos de error

- **400 Bad Request**: Parámetros inválidos (franquicia no válida, JSON malformado)
- **503 Service Unavailable**: API externa no disponible
- **500 Internal Server Error**: Error interno del servidor

## Arquitectura

La aplicación utiliza arquitectura hexagonal (puertos y adaptadores) con:

- **Dominio**: Entidades y puertos (interfaces)
- **Aplicación**: Casos de uso
- **Infraestructura**: Adaptadores y controladores
- **Compartido**: DTOs e interfaces

## Almacenamiento

Todos los resultados de las solicitudes se almacenan automáticamente en memoria y pueden ser consultados mediante el endpoint `/v1/api/storage/all`.

## Características especiales

- **Evoluciones de Pokémon**: Se obtienen automáticamente de la cadena evolutiva
- **Validación estricta**: Solo acepta franquicias válidas (pokemon, digimon)
- **Manejo de errores**: Errores específicos mapeados a códigos HTTP apropiados
- **Documentación completa**: Swagger con ejemplos y tipos de respuesta 