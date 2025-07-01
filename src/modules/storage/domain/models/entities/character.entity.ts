import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CharacterStatus } from 'src/shared/enums/character-status.enum';
import { Franchise } from 'src/shared/enums/franchise.enum';
import { ApiProperty } from '@nestjs/swagger';
import { ENTITIES_NAME } from 'src/shared/constants/entities-name';

@Entity(ENTITIES_NAME.CHARACTER)
export class CharacterEntity {
  @ApiProperty({
    description: 'Character ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Franchise',
    example: Franchise.POKEMON,
  })
  @Column({
    type: 'varchar',
    length: 10,
    default: Franchise.POKEMON,
  })
  franchise: Franchise;

  @ApiProperty({
    description: 'Version',
    example: 'v1',
  })
  @Column({
    type: 'varchar',
    length: 20,
  })
  version: string;

  @ApiProperty({
    description: 'Metadata',
    example: { name: 'Pikachu' },
  })
  @Column('text')
  metadata: string;

  @ApiProperty({
    description: 'Config',
    example: '{"baseUrl":"https://api.example.com/v1"}',
  })
  @Column('text')
  config: string;

  @ApiProperty({
    description: 'Status',
    example: CharacterStatus.SUCCESS,
  })
  @Column({
    type: 'varchar',
    length: 10,
    default: CharacterStatus.SUCCESS,
  })
  status: CharacterStatus;

  @ApiProperty({
    description: 'Error Message',
    example: 'This is an error message',
  })
  @Column({ type: 'text', nullable: true })
  errorMessage?: string | null;

  @ApiProperty({
    description: 'Timestamp',
    example: '2021-01-01T00:00:00.000Z',
  })
  @Column()
  timestamp: string;
}
