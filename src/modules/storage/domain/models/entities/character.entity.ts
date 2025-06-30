import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('characters')
export class CharacterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  franquicia: string;

  @Column()
  version: string;

  @Column('text')
  metadata: string;

  @Column('text')
  config: string;

  @Column('text')
  data: string;

  @Column()
  timestamp: string;
}
