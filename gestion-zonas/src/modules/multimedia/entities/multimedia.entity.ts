import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany, JoinColumn } from 'typeorm';
import { Place } from 'src/modules/places/entities/place.entity';

@Entity('multimedia')
export class Multimedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  path: string;

  @ManyToOne(() => Place, (place) => place.id, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'place_id' })
  place_id: Place;

}
