import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany, JoinColumn } from 'typeorm';
import { Place } from 'src/modules/places/entities/place.entity';

/**
 * Entidad que representa un archivo multimedia en la base de datos.
 */
@Entity('multimedia')
export class Multimedia {
  /**
   * Identificador único del archivo multimedia.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Tipo del archivo multimedia (por ejemplo, imagen, video, etc.).
   */
  @Column()
  type: string;

  /**
   * Ruta donde se almacena el archivo multimedia.
   */
  @Column()
  path: string;

  /**
   * Relación muchos a uno con la entidad Place.
   * Representa el lugar al que pertenece el archivo multimedia.
   */
  @ManyToOne(() => Place, (place) => place.id, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'place_id' })
  place_id: Place;
}
