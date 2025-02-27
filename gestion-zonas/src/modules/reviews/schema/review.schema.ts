import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


/**
 * Entidad que representa una reseña en la base de datos.
 */
@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({ required: true, type: Number })
  placeId: number;

  @Prop({ required: true })
  rating: number;

  @Prop()
  comment: string;

  @Prop({ type: [String] })
  media: string[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
