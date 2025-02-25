import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QuestionAnswer } from './schema/questionAnswer.schema';
import { QuestionAnswerService } from './questionAnswer.service';
import { CreateQuestionAnswerDto } from './dto/questionAnswer.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseQuestionDto } from './dto/responseQuestion.dto';

@Controller('questionanswers')
export class QuestionAnswerController {
  constructor(private readonly questionanswerService: QuestionAnswerService) { }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva pregunta' })
  @ApiResponse({ status: 201, description: 'pregunta creada exitosamente.' })
  async create(@Body() questionAnswerData: CreateQuestionAnswerDto) {
    return this.questionanswerService.create(questionAnswerData);
  }

  @Get(':placeId')
  @ApiOperation({ summary: 'Crear retorna las preguntas y respuestas asociadas a un lugar' })
  @ApiResponse({ status: 201, description: 'respuesta creada exitosamente.' })
  async getQuestionAnswers(@Param('placeId') placeId: string) {
    return this.questionanswerService.findAllByPlace(placeId);
  }

  @Post('responseQuestion')
  @ApiOperation({ summary: 'Crear retorna las respuestas a la preguntas asociadas a un lugar' })
  @ApiResponse({ status: 201, description: 'respuesta a la pregunta realizada en un lugar.' })
  async responseAswer(@Body() responseQuestionDto: ResponseQuestionDto) {
    return this.questionanswerService.responseAswer(responseQuestionDto);
  }
}
