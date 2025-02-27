import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Entidad que representa el historial de cambios en la base de datos.
 */
@Schema({ timestamps: true })
export class ChangeHistory extends Document {
  @Prop({ required: true })
  placeId: number;

  @Prop({ type: Object, required: true })
  changes: Record<string, any>;

  /**
   * Razón o motivo del cambio.
   */
  @Prop()
  reason: string;
}

export const ChangeHistorySchema = SchemaFactory.createForClass(ChangeHistory);
