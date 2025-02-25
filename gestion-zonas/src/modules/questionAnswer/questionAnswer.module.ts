import { Module } from '@nestjs/common';
import { QuestionAnswer, QuestionAnswerSchema } from './schema/questionAnswer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionAnswerController } from './questionAnswer.controller';
import { QuestionAnswerService } from './questionAnswer.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: QuestionAnswer.name, schema: QuestionAnswerSchema }])],
  controllers: [QuestionAnswerController],
  providers: [QuestionAnswerService]
})
export class QuestionAnswerModule { }
