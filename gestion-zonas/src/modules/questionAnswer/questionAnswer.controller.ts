import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { QuestionAnswer } from './schema/questionAnswer.schema';
import { QuestionAnswerService } from './questionAnswer.service';
import { CreateQuestionAnswerDto } from './dto/questionAnswer.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseQuestionDto } from './dto/responseQuestion.dto';
import { UpdateQuestionAnswerDto } from './dto/updateQuestionAnswer.dto';

/**
 * Controlador que maneja las operaciones relacionadas con las preguntas y respuestas.
 */
@Controller('questionanswers')
export class QuestionAnswerController {
  constructor(private readonly questionanswerService: QuestionAnswerService) { }

  /**
   * Crea una nueva pregunta.
   *
   * @param questionAnswerData Datos de la nueva pregunta.
   * @returns Mensaje de confirmación de creación.
   */
  @Post()
  @ApiOperation({ summary: 'Crear una nueva pregunta' })
  @ApiResponse({ status: 201, description: 'Pregunta creada exitosamente.' })
  async create(@Body() questionAnswerData: CreateQuestionAnswerDto) {
    return this.questionanswerService.create(questionAnswerData);
  }

  /**
   * Obtiene las preguntas y respuestas asociadas a un lugar.
   *
   * @param placeId Identificador del lugar.
   * @returns Lista de preguntas y respuestas asociadas al lugar.
   */
  @Get(':placeId')
  @ApiOperation({ summary: 'Obtener las preguntas y respuestas asociadas a un lugar' })
  @ApiResponse({ status: 200, description: 'Preguntas y respuestas obtenidas exitosamente.' })
  async getQuestionAnswers(@Param('placeId') placeId: string) {
    return this.questionanswerService.findAllByPlace(placeId);
  }

  /**
   * Crea y retorna las respuestas a las preguntas asociadas a un lugar.
   *
   * @param responseQuestionDto Datos de la respuesta a la pregunta.
   * @returns Respuesta a la pregunta realizada en un lugar.
   */
  @Post('responseQuestion')
  @ApiOperation({ summary: 'Crear y retornar las respuestas a las preguntas asociadas a un lugar' })
  @ApiResponse({ status: 201, description: 'Respuesta a la pregunta realizada en un lugar.' })
  async responseAswer(@Body() responseQuestionDto: ResponseQuestionDto) {
    return this.questionanswerService.responseAswer(responseQuestionDto);
  }

  /**
   * Actualiza una pregunta por su ID.
   *
   * @param id Identificador de la pregunta.
   * @param updateChangeHistoryDto Datos actualizados de la pregunta.
   * @returns La pregunta actualizada.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Editar la pregunta' })
  @ApiResponse({ status: 200, description: 'Pregunta editada exitosamente.' })
  async update(
    @Param('id') id: string,
    @Body() updateChangeHistoryDto: UpdateQuestionAnswerDto,
  ): Promise<QuestionAnswer> {
    return this.questionanswerService.update(id, updateChangeHistoryDto);
  }

  /**
   * Elimina una pregunta por su ID.
   *
   * @param id Identificador de la pregunta.
   * @returns Mensaje de confirmación de eliminación.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una pregunta por ID' })
  @ApiResponse({ status: 200, description: 'Pregunta eliminada exitosamente.' })
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.questionanswerService.delete(id);
  }
}
