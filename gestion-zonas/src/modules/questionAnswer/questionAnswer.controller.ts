import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { QuestionAnswer } from './schema/questionAnswer.schema';
import { QuestionAnswerService } from './questionAnswer.service';
import { CreateQuestionAnswerDto } from './dto/questionAnswer.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseQuestionDto } from './dto/responseQuestion.dto';
import { UpdateQuestionAnswerDto } from './dto/updateQuestionAnswer.dto';

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

  /**
   * Actualiza una pregunta por su ID
   * @param id 
   * @param updateChangeHistoryDto 
   * @returns {Promise<ChangeHistory>}
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Editar la pregunta' })
  @ApiResponse({ status: 201, description: 'pregunta editada exitosamente.' })
  async update(
    @Param('id') id: string,
    @Body() updateChangeHistoryDto: UpdateQuestionAnswerDto,
  ): Promise<QuestionAnswer> {
    return this.questionanswerService.update(id, updateChangeHistoryDto);
  }

  /**
   * Elimina una pregunta por su ID
   * @param id 
   * @returns {Promise<{ message: string }>}
   */
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.questionanswerService.delete(id);
  }
}
