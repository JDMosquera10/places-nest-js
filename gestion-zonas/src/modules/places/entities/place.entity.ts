import { Category } from 'src/modules/categories/entities/category.entity';
import { Label } from 'src/modules/labels/entities/label.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { LabelPlace } from './label-place';

@Entity('places')
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  type: string;

  @Column()
  schedule: string;

  @Column('text')
  description: string;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category_id: Category;

  @OneToMany(() => LabelPlace, (labelPlace) => labelPlace.place, { cascade: true })
  labelPlaces: LabelPlace[];
}
