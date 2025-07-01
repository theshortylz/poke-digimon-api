import { Test, TestingModule } from '@nestjs/testing';
import { TypeormStorageAdapter } from './storage.adapter';
import { Repository } from 'typeorm';
import { CharacterEntity } from '../../domain/models/entities/character.entity';
import { RedisCacheService } from 'src/modules/common/cache/redis-cache.service';
import { CACHE_KEYS } from 'src/shared/constants/cache-keys';

const mockRepo = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
});
const mockCache = () => ({
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
});

describe('TypeormStorageAdapter', () => {
  let adapter: TypeormStorageAdapter;
  let repo: ReturnType<typeof mockRepo>;
  let cache: ReturnType<typeof mockCache>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeormStorageAdapter,
        { provide: 'CharacterEntityRepository', useFactory: mockRepo },
        { provide: RedisCacheService, useFactory: mockCache },
      ],
    })
      .overrideProvider('CharacterEntityRepository')
      .useValue(mockRepo())
      .overrideProvider(RedisCacheService)
      .useValue(mockCache())
      .compile();

    repo = module.get('CharacterEntityRepository');
    cache = module.get(RedisCacheService);
    adapter = new TypeormStorageAdapter(repo as any, cache as any);
  });

  it('should save entity and invalidate cache', async () => {
    // Arrange
    repo.create.mockReturnValue({});
    repo.save.mockResolvedValue({});
    cache.del.mockResolvedValue(undefined);

    // Act
    await adapter.save('pokemon', 'v1', {}, {}, { status: 'success' });

    // Assert
    expect(repo.create).toHaveBeenCalled();
    expect(repo.save).toHaveBeenCalled();
    expect(cache.del).toHaveBeenCalledWith(CACHE_KEYS.STORAGE.ALL_DATA.key);
  });

  it('should return data from cache if available', async () => {
    // Arrange
    const cached = JSON.stringify([{ id: 1 }]);
    cache.get.mockResolvedValue(cached);

    // Act
    const result = await adapter.getAll();

    // Assert
    expect(cache.get).toHaveBeenCalledWith(CACHE_KEYS.STORAGE.ALL_DATA.key);
    expect(result).toEqual(JSON.parse(cached));
  });

  it('should query db and cache result if not in cache', async () => {
    // Arrange
    cache.get.mockResolvedValue(null);
    repo.find.mockResolvedValue([{ id: 1 }]);
    cache.set.mockResolvedValue(undefined);

    // Act
    const result = await adapter.getAll();

    // Assert
    expect(repo.find).toHaveBeenCalled();
    expect(cache.set).toHaveBeenCalledWith(
      CACHE_KEYS.STORAGE.ALL_DATA.key,
      JSON.stringify([{ id: 1 }]),
      CACHE_KEYS.STORAGE.ALL_DATA.ttl,
    );
    expect(result).toEqual([{ id: 1 }]);
  });

  it('should throw NotFoundException if no data in db', async () => {
    // Arrange
    cache.get.mockResolvedValue(null);
    repo.find.mockResolvedValue([]);

    // Act & Assert
    await expect(adapter.getAll()).rejects.toThrow('No data found on storage');
  });
}); 