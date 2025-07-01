import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CharacterStatus } from 'src/shared/enums/character-status.enum';

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

  @Column('text', { nullable: true })
  data: string | null;

  @Column({ type: 'varchar', length: 10, default: CharacterStatus.SUCCESS })
  status: CharacterStatus;

  @Column({ type: 'text', nullable: true })
  errorMessage?: string | null;

  @Column()
  timestamp: string;
}
