import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Esquema que representa una pregunta y sus respuestas.
 */
@Schema({ timestamps: true })
export class QuestionAnswer extends Document {
  @Prop({ required: true })
  placeId: number;

  @Prop({ required: true })
  question: string;

  @Prop({ type: [{ answer: String, createdAt: { type: Date, default: Date.now } }] })
  answers: { answer: string; createdAt?: Date }[];
}

export const QuestionAnswerSchema = SchemaFactory.createForClass(QuestionAnswer);

