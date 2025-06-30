import { Module } from '@nestjs/common';
import { dataSourceOptions } from './datasource';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
})
export class DatabaseModule {}
