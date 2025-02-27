import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateQuestionAnswerDto } from './questionAnswer.dto';

export class UpdateQuestionAnswerDto extends PartialType(CreateQuestionAnswerDto) {}