# 🎮 Poke-Digimon API

API REST para obtener información de personajes de las franquicias **Pokémon** y **Digimon**, construida con **NestJS** e implementando **Arquitectura Hexagonal (Clean Architecture)**.

## 📋 Descripción

Esta API permite consultar información detallada de personajes de Pokémon y Digimon, incluyendo sus poderes, evoluciones y características. La aplicación está diseñada con una arquitectura modular que permite escalabilidad y mantenibilidad.

## 🏗️ Arquitectura Implementada

### Arquitectura Hexagonal (Clean Architecture)

El proyecto implementa **Arquitectura Hexagonal** con las siguientes capas:

- **🏛️ Dominio**: Entidades y reglas de negocio
- **📱 Aplicación**: Casos de uso y lógica de aplicación
- **🔌 Infraestructura**: Adaptadores, controladores y acceso a datos externos

### Estructura del Proyecto

```
src/
├── modules/
│   ├── pokemon/                    # Módulo de Pokémon
│   │   ├── domain/                 # Entidades y puertos
│   │   │   └── ports/
│   │   │       └── pokemon-port.ts
│   │   ├── application/            # Casos de uso
│   │   │   └── use-cases/
│   │   │       └── get-pokemon-data.usecase.ts
│   │   └── infrastructure/         # Adaptadores y controladores
│   │       └── adapters/
│   │           └── pokemon-api.adapter.ts
│   ├── digimon/                    # Módulo de Digimon
│   │   ├── domain/
│   │   ├── application/
│   │   └── infrastructure/
│   └── storage/                    # Módulo de almacenamiento
│       ├── domain/
│       │   └── models/
│       │       └── entities/
│       │           └── character.entity.ts
│       └── infraestructure/
│           └── adapters/
│               └── storage.adapter.ts
├── shared/                         # Componentes compartidos
│   ├── enums/
│   ├── constants/
│   └── errors/
└── apps/                           # Controladores de la API
    ├── pokemon/
    ├── digimon/
    └── storage/
```

## 🚀 Endpoints Disponibles

### Pokémon
- **GET** `/api/pokemon/v1` - Obtener información de un Pokémon

### Digimon
- **GET** `/api/digimon/v1` - Obtener información de un Digimon

### Almacenamiento
- **GET** `/api/storage/v1/all` - Obtener historial de consultas

## 📦 Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd poke-digimon-api
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno** (si es necesario)
```bash
# Crear archivo .env si no existe
cp .env.example .env
```

## 🏃‍♂️ Ejecución

### Desarrollo
```bash
npm run start:dev
```

### Producción
```bash
npm run build
npm run start:prod
```

### Generar migraciones
```bash
npm run migration:generate src/database/migrations/${Nombre de la migración}
```

### Ejecutar migraciones
```bash
npm run migration:run
```

## 📖 Uso de la API

### Ejemplo: Obtener información de un Pokémon

```bash
curl "http://localhost:3000/api/pokemon/v1?metadata={\"name\":\"pikachu\"}&config={\"baseUrl\":\"https://pokeapi.co/api/v2\"}"
```

**Respuesta:**
```json
{
  "name": "pikachu",
  "weight": 60,
  "powers": ["static", "lightning-rod"],
  "evolutions": ["raichu"]
}
```

### Ejemplo: Obtener información de un Digimon

```bash
curl "http://localhost:3000/api/digimon/v1?metadata={\"id\":42}&config={\"baseUrl\":\"https://digi-api.com/api/v1\"}"
```

**Respuesta:**
```json
{
  "name": "Agumon",
  "powers": ["Pepper Breath", "Baby Burner"],
  "evolutions": ["Greymon", "MetalGreymon"]
}
```

## 📚 Documentación API

Una vez ejecutada la aplicación, accede a la documentación interactiva de Swagger:

```
http://localhost:3000/api-docs
```

## 🛠️ Tecnologías Utilizadas

- **NestJS**: Framework para aplicaciones Node.js escalables
- **TypeScript**: Lenguaje de programación tipado
- **TypeORM**: ORM para manejo de base de datos
- **SQLite**: Base de datos local
- **Swagger**: Documentación automática de la API
- **Axios**: Cliente HTTP para llamadas a APIs externas

## 🏛️ Beneficios de la Arquitectura

1. **🔧 Mantenibilidad**: Código organizado y fácil de mantener
2. **🧪 Testabilidad**: Cada módulo puede ser testeado de forma aislada
3. **📈 Escalabilidad**: Módulos independientes que pueden crecer por separado
4. **🔄 Reutilización**: Componentes compartidos entre módulos
5. **🚀 Despliegue Independiente**: Posibilidad de desplegar módulos por separado

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
