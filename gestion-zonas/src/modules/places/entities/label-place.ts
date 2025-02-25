import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Place } from '../../places/entities/place.entity';
import { Label } from '../../labels/entities/label.entity';

@Entity('labels_places') // Se usa el nombre exacto de la tabla en la BD
export class LabelPlace {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Place, (place) => place.labelPlaces, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'place_id' })
  place: Place;

  @ManyToOne(() => Label, (label) => label.labelPlaces, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'label_id' })
  label: Label;
}
