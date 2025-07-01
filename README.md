# 🎮 Poke-Digimon API

REST API for obtaining character information from **Pokémon** and **Digimon** franchises, built with **NestJS** and implementing **Hexagonal Architecture (Clean Architecture)**.

## 📋 Description

This API allows you to query detailed information about Pokémon and Digimon characters, including their powers, evolutions, and characteristics. The application is designed with a modular architecture that enables scalability and maintainability.

## 🏗️ Implemented Architecture

### Hexagonal Architecture (Clean Architecture)

The project implements **Hexagonal Architecture** with the following layers:

- **🏛️ Domain**: Entities and business rules
- **📱 Application**: Use cases and application logic
- **🔌 Infrastructure**: Adapters, controllers, and external data access

### Project Structure

```
src/
├── modules/
│   ├── pokemon/                    # Pokémon Module
│   │   ├── domain/                 # Entities and ports
│   │   │   └── ports/
│   │   │       └── pokemon-port.ts
│   │   ├── application/            # Use cases
│   │   │   └── use-cases/
│   │   │       └── get-pokemon-data.usecase.ts
│   │   └── infrastructure/         # Adapters and controllers
│   │       └── adapters/
│   │           └── pokemon-api.adapter.ts
│   ├── digimon/                    # Digimon Module
│   │   ├── domain/
│   │   ├── application/
│   │   └── infrastructure/
│   ├── storage/                    # Storage Module
│   │   ├── domain/
│   │   │   └── models/
│   │   │       └── entities/
│   │   │           └── character.entity.ts
│   │   └── infraestructure/
│   │       └── adapters/
│   │           └── storage.adapter.ts
│   └── redis/                      # Redis Cache Module
│       ├── redis-cache.service.ts
│       └── redis-cache.module.ts
├── shared/                         # Shared components
│   ├── enums/
│   ├── constants/
│   │   └── cache-keys.ts          # Centralized cache keys and TTL
│   └── errors/
└── apps/                           # API Controllers
    ├── pokemon/
    ├── digimon/
    └── storage/
```

## 🚀 Available Endpoints

### Pokémon
- **GET** `/api/pokemon/v1/find-pokemon` - Get Pokémon information

### Digimon
- **GET** `/api/digimon/v1/find-digimon` - Get Digimon information

### Storage
- **GET** `/api/storage/v1/find-all-storage` - Get query history (with Redis caching)

## 📦 Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- **Redis** (required for caching functionality)

### Redis Setup

This application uses Redis for caching to improve performance. You need to have Redis running before starting the application.

#### Option 1: Using Docker (Recommended)
```bash
# Start Redis container
docker run --name redis-cache -p 6379:6379 -d redis:alpine

# Verify Redis is running
docker ps

# For future sessions, just start the existing container
docker start redis-cache
```

#### Option 2: Install Redis locally
```bash
# Windows (using Chocolatey)
choco install redis-64
redis-server

# macOS (using Homebrew)
brew install redis
brew services start redis

# Linux (Ubuntu/Debian)
sudo apt update
sudo apt install redis-server
sudo systemctl start redis-server
```

#### Option 3: Using WSL2 (Windows)
```bash
# Install WSL2 if not already installed
wsl --install

# In WSL2 terminal
sudo apt update
sudo apt install redis-server
sudo service redis-server start
```

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd poke-digimon-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables** (if needed)
```bash
# Create .env file if it doesn't exist
cp .env.example .env
```

# .env.example

PORT = 3000
DB_NAME=my-database.sqlite
REDIS_HOST=redishost
REDIS_PORT=6379

## 🏃‍♂️ Execution

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

### Generate Migrations
```bash
npm run migration:generate src/database/migrations/${MigrationName}
```

### Run Migrations
```bash
npm run migration:run
```

## 📖 API Usage

### Example: Get Pokémon Information

```bash
curl "http://localhost:3000/api/pokemon/v1?metadata={\"name\":\"pikachu\"}&config={\"baseUrl\":\"https://pokeapi.co/api/v2\"}"
```

**Response:**
```json
{
  "name": "pikachu",
  "weight": 60,
  "powers": ["static", "lightning-rod"],
  "evolutions": ["raichu"]
}
```

### Example: Get Digimon Information

```bash
curl "http://localhost:3000/api/digimon/v1?metadata={\"id\":42}&config={\"baseUrl\":\"https://digi-api.com/api/v1\"}"
```

**Response:**
```json
{
  "name": "Agumon",
  "powers": ["Pepper Breath", "Baby Burner"],
  "evolutions": ["Greymon", "MetalGreymon"]
}
```

## 📚 API Documentation

Once the application is running, access the interactive Swagger documentation:

```
http://localhost:3000/api-docs
```

## 🛠️ Technologies Used

- **NestJS**: Framework for scalable Node.js applications
- **TypeScript**: Typed programming language
- **TypeORM**: ORM for database management
- **SQLite**: Local database
- **Redis**: In-memory data structure store for caching
- **Swagger**: Automatic API documentation
- **Axios**: HTTP client for external API calls

## 🏛️ Architecture Benefits

1. **🔧 Maintainability**: Organized and easy-to-maintain code
2. **🧪 Testability**: Each module can be tested in isolation
3. **📈 Scalability**: Independent modules that can grow separately
4. **🔄 Reusability**: Shared components between modules
5. **🚀 Independent Deployment**: Possibility to deploy modules separately

## 💾 Storage and Auditing

### Storage Features

- **Persistence**: All results are stored in SQLite
- **Redis Caching**: Performance optimization with Redis cache
  - **Cache Strategy**: Cache-aside pattern for read operations
  - **TTL**: 5 minutes for storage queries
  - **Automatic Invalidation**: Cache is cleared when new data is saved
- **Auditing**: Each query records:
  - `franchise`: `pokemon` or `digimon`
  - `version`: version of the query excecuted
  - `metadata`: metadata used to run the query
  - `status`: `success` or `fail`
  - `errorMessage`: Error message if it fails
  - `timestamp`: Date and time of the query
- **UUID**: Unique identifiers for each record
- **History**: Complete query of all operations

### Cache Configuration

The application uses centralized cache keys and TTL configuration:

```typescript
// src/shared/constants/cache-keys.ts
export const CACHE_KEYS = {
  STORAGE: {
    ALL_DATA: {
      key: 'storage:all-data',
      ttl: 300, // 5 minutes
    },
  },
  // Future modules can be added here
};
```

### Storage Structure

```json
{
  "id": "uuid",
  "franchise": "pokemon|digimon",
  "version": "v1",
  "metadata": "JSON string",
  "config": "JSON string", 
  "status": "success|fail",
  "errorMessage": "string|null",
  "timestamp": "ISO 8601"
}
```

## 🎯 Special Features

### Pokémon
- **Automatic evolutions**: Obtained from the complete evolutionary chain
- **Powers**: Abilities and special characteristics
- **Weight**: Physical information of the Pokémon

### Digimon
- **Evolutions**: Previous and next evolutions
- **Powers**: Abilities and special attacks
- **Flexibility**: Support for different types of Digimon

### General
- **Strict validation**: Only accepts valid franchises
- **Robust error handling**: Specific errors with appropriate HTTP codes
- **Automatic documentation**: Swagger with examples and types
- **Scalable architecture**: Independent and reusable modules

## 🚀 Complete Usage Examples

### Get Pikachu Information
```bash
curl -X GET "http://localhost:3000/api/pokemon/v1" \
  -H "Content-Type: application/json" \
  -G \
  -d "metadata={\"name\":\"pikachu\"}" \
  -d "config={\"baseUrl\":\"https://pokeapi.co/api/v2\"}"
```

### Get Agumon Information
```bash
curl -X GET "http://localhost:3000/api/digimon/v1" \
  -H "Content-Type: application/json" \
  -G \
  -d "metadata={\"id\":42}" \
  -d "config={\"baseUrl\":\"https://digi-api.com/api/v1\"}"
```

### Query Operation History
```bash
curl -X GET "http://localhost:3000/api/storage/v1/find-all-storage" \
  -H "Content-Type: application/json"
```

## 📝 Important Notes

1. **Redis Requirement**: Redis must be running before starting the application
2. **JSON Encoding**: The `metadata` and `config` parameters must be properly URL-encoded
3. **Rate Limiting**: Respect the limits of external APIs
4. **Cache**: Results are automatically stored for auditing and cached for performance
5. **Versioning**: Versioned API for future compatibility
6. **Documentation**: Always consult Swagger for the most up-to-date documentation

## 📝 License

This project is under the MIT License. See the `LICENSE` file for more details.

## 📞 Contact

If you have any questions or suggestions, feel free to open an issue in the repository.

---

**For more information, consult the interactive documentation at:** `http://localhost:3000/api-docs`
