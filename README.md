# API de Pokémon y Digimon - Arquitectura Modular Hexagonal

API REST para obtener información de personajes de las franquicias Pokémon y Digimon, construida con arquitectura hexagonal modular y NestJS.

## 🏗️ Arquitectura

Este proyecto implementa una **arquitectura monolítica modular apificada hexagonal** con las siguientes características:

- **Módulos Independientes**: Cada franquicia (Pokémon y Digimon) tiene su propio módulo completo
- **Arquitectura Hexagonal**: Separación clara entre dominio, aplicación e infraestructura
- **Escalabilidad**: Cada módulo puede evolucionar independientemente
- **Reutilización**: Componentes compartidos en la capa `shared`

### Estructura de Módulos

```
src/
├── modules/
│   ├── pokemon/           # Módulo independiente de Pokémon
│   │   ├── domain/        # Entidades y puertos
│   │   ├── application/   # Casos de uso
│   │   └── infrastructure/ # Adaptadores y controladores
│   └── digimon/           # Módulo independiente de Digimon
│       ├── domain/        # Entidades y puertos
│       ├── application/   # Casos de uso
│       └── infrastructure/ # Adaptadores y controladores
└── shared/                # Componentes compartidos
    ├── interfaces/        # Interfaces comunes
    ├── dto/              # DTOs compartidos
    └── controllers/      # Controladores compartidos
```

## 🚀 Endpoints

### Pokémon
- **GET** `/api/pokemon/v1` - Obtener información de un Pokémon

### Digimon
- **GET** `/api/digimon/v1` - Obtener información de un Digimon

### Almacenamiento
- **GET** `/api/storage/v1/all` - Obtener historial de consultas

## 📋 Parámetros

### Query Parameters

- `metadata` (JSON): Metadatos específicos de la franquicia
- `config` (JSON): Configuración para la API externa

### Ejemplos de uso

#### Pokémon
```bash
GET /api/pokemon/v1?metadata={"name":"pikachu"}&config={"baseUrl":"https://pokeapi.co/api/v2"}
```

#### Digimon
```bash
GET /api/digimon/v1?metadata={"id":42}&config={"baseUrl":"https://digi-api.com/api/v1"}
```

## 📊 Respuesta Estándar

Todas las respuestas siguen esta estructura:

```json
{
  "data": {
    "name": "string",
    "weight": "number (opcional)",
    "powers": ["string"],
    "evolutions": ["string"]
  },
  "version": "v1",
  "franquicia": "pokemon|digimon",
  "timestamp": "ISO 8601"
}
```

## 🛠️ Instalación

```bash
npm install
```

## 🏃‍♂️ Ejecución

```bash
# Desarrollo
npm run start:dev

# Producción
npm run start:prod
```

## 📚 Documentación API

Una vez ejecutada la aplicación, accede a la documentación Swagger en:

```
http://localhost:3000/api-docs
```

## 🔧 Tecnologías

- **NestJS**: Framework para aplicaciones Node.js escalables
- **TypeScript**: Lenguaje de programación tipado
- **Arquitectura Hexagonal**: Patrón de arquitectura limpia
- **Swagger**: Documentación automática de la API
- **Axios**: Cliente HTTP para llamadas a APIs externas

## 🏛️ Beneficios de la Arquitectura Modular

1. **Escalabilidad**: Cada módulo puede crecer independientemente
2. **Mantenibilidad**: Código organizado y fácil de mantener
3. **Testabilidad**: Cada módulo puede ser testeado de forma aislada
4. **Reutilización**: Componentes compartidos entre módulos
5. **Despliegue Independiente**: Posibilidad de desplegar módulos por separado en el futuro

## 📝 Licencia

MIT
