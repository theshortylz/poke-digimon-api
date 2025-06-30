export interface StoragePort {
  save(
    franquicia: string,
    version: string,
    metadata: any,
    config: any,
    data: any,
  ): Promise<void>;
  getAll(): Promise<any[]>;
}
