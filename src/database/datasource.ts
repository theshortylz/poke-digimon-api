import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { CharacterEntity } from 'src/modules/storage/domain/models/entities/character.entity';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: join(
    __dirname,
    '..',
    '..',
    process.env.DB_NAME || 'poke_digi.sqlite',
  ),
  entities: [CharacterEntity],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
