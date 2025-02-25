import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ChangeHistory extends Document {
  @Prop({ required: true })
  placeId: number;

  @Prop({ type: Object, required: true })
  changes: Record<string, any>;

  @Prop()
  reason: string;
}

export const ChangeHistorySchema = SchemaFactory.createForClass(ChangeHistory);
