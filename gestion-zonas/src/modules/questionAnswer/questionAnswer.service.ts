import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { QuestionAnswer } from './schema/questionAnswer.schema';
import { CreateQuestionAnswerDto } from './dto/questionAnswer.dto';
import { ResponseQuestionDto } from './dto/responseQuestion.dto';
import { UpdateQuestionAnswerDto } from './dto/updateQuestionAnswer.dto';

@Injectable()
export class QuestionAnswerService {
  constructor(@InjectModel(QuestionAnswer.name) private questionanswerModel: Model<QuestionAnswer>) {}

  /**
   * metodo encargado de crear una nueva pregunta asociada a un lugar
   * @param questionanswerData 
   * @returns {QuestionAnswer}
   */
  async create(questionanswerData: CreateQuestionAnswerDto): Promise<QuestionAnswer> {
    try {
    return new this.questionanswerModel(questionanswerData).save();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error inesperado al crear la pregunta');
    }
  }

  /**
   * metodo que buscar las preguntas con sus respuestas, de un lugar (busca por el id del lugar)
   * @param placeId 
   * @returns {QuestionAnswer[]}
   */
  async findAllByPlace(placeId: string): Promise<QuestionAnswer[]> {
    try {
    return this.questionanswerModel.find({ placeId }).exec();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error inesperado al obtener las preguntas');
    }
  }


   /**
   * metodo encargado de crear una nueva pregunta asociada a un lugar
   * @param responseQuestionDto 
   * @returns {QuestionAnswer}
   */
   async responseAswer(responseQuestionDto: ResponseQuestionDto): Promise<QuestionAnswer> {
    try {
    const newAnswer = {
      _id: new Types.ObjectId(), // Genera un nuevo ObjectId para la respuesta
      answer: responseQuestionDto.respone,
      createdAt: new Date(),
    };
    const objectId = new Types.ObjectId(responseQuestionDto.questionId);
    const updatedQuestion = await this.questionanswerModel.findByIdAndUpdate(
      objectId,
      { $push: { answers: newAnswer } }, // Agrega la nueva respuesta al array
      { new: true, useFindAndModify: false }
    );

    if (!updatedQuestion) {
      throw new NotFoundException('Pregunta no encontrada');
    }

    return updatedQuestion;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error inesperado al responder la pregunta');
    }
  }
  
    /**
     * Actualiza un historial de cambios por su ID
     * @param id 
     * @param updateData 
     * @returns {Promise<QuestionAnswer>}
     */
    async update(id: string, updateData: UpdateQuestionAnswerDto): Promise<QuestionAnswer> {
      try {
      const updatedChangeHistory = await this.questionanswerModel
        .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
        .exec();
      if (!updatedChangeHistory) {
        throw new NotFoundException(`pregunta con ID ${id} no encontrada`);
      }
      return updatedChangeHistory;
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException('Error inesperado al actualizar la pregunta');
      }
    }
  
    /**
     * Elimina un historial de cambios por su ID
     * @param id 
     * @returns {Promise<{ message: string }>}
     */
    async delete(id: string): Promise<{ message: string }> {
      try {
      const result = await this.questionanswerModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`la pregunta con ID ${id} no encontrada`);
      }
      return { message: `pregunta con ID ${id} eliminada correctamente` };
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException('Error inesperado al eliminar la pregunta');
      }
    }
}
