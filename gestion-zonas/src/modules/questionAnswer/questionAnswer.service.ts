import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { QuestionAnswer } from './schema/questionAnswer.schema';
import { CreateQuestionAnswerDto } from './dto/questionAnswer.dto';
import { ResponseQuestionDto } from './dto/responseQuestion.dto';

@Injectable()
export class QuestionAnswerService {
  constructor(@InjectModel(QuestionAnswer.name) private questionanswerModel: Model<QuestionAnswer>) {}

  /**
   * metodo encargado de crear una nueva pregunta asociada a un lugar
   * @param questionanswerData 
   * @returns {QuestionAnswer}
   */
  async create(questionanswerData: CreateQuestionAnswerDto): Promise<QuestionAnswer> {
    return new this.questionanswerModel(questionanswerData).save();
  }

  /**
   * metodo que buscar las preguntas con sus respuestas, de un lugar (busca por el id del lugar)
   * @param placeId 
   * @returns {QuestionAnswer[]}
   */
  async findAllByPlace(placeId: string): Promise<QuestionAnswer[]> {
    return this.questionanswerModel.find({ placeId }).exec();
  }


   /**
   * metodo encargado de crear una nueva pregunta asociada a un lugar
   * @param responseQuestionDto 
   * @returns {QuestionAnswer}
   */
   async responseAswer(responseQuestionDto: ResponseQuestionDto): Promise<QuestionAnswer> {
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
  }
}
