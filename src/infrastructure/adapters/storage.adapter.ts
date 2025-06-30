import { StoragePort } from 'src/domain/ports/storage-port';

export class InMemoryStorageAdapter implements StoragePort {
  private storage: any[] = [];

  async save(
    franquicia: string,
    version: string,
    metadata: any,
    config: any,
    data: any,
  ): Promise<void> {
    const record = {
      franquicia,
      version,
      metadata,
      config,
      data,
      timestamp: new Date().toISOString(),
    };

    this.storage.push(record);
  }

  async getAll(): Promise<any[]> {
    return this.storage;
  }
}
