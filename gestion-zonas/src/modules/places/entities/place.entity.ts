import { Category } from 'src/modules/categories/entities/category.entity';
import { Label } from 'src/modules/labels/entities/label.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { LabelPlace } from './label-place';

/**
 * Entidad que representa un lugar en la base de datos.
 */
@Entity('places')
export class Place {
  /**
   * Identificador único del lugar.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Nombre del lugar.
   */
  @Column()
  name: string;

  /**
   * Dirección del lugar.
   */
  @Column()
  address: string;

  /**
   * Tipo del lugar (por ejemplo, restaurante, parque, etc.).
   */
  @Column()
  type: string;

  /**
   * Horario del lugar.
   */
  @Column()
  schedule: string;

  /**
   * Descripción detallada del lugar.
   */
  @Column('text')
  description: string;

  /**
   * Relación muchos a uno con la entidad Category.
   * Representa la categoría a la que pertenece el lugar.
   */
  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category_id: Category;

  /**
   * Relación uno a muchos con la entidad LabelPlace.
   * Representa las etiquetas asociadas a este lugar.
   */
  @OneToMany(() => LabelPlace, (labelPlace) => labelPlace.place, { cascade: true })
  labelPlaces: LabelPlace[];
}
