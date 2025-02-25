import { LabelPlace } from 'src/modules/places/entities/label-place';
import { Place } from 'src/modules/places/entities/place.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity('labels')
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => LabelPlace, (labelPlace) => labelPlace.label, { cascade: true })
  labelPlaces: LabelPlace[];
}
