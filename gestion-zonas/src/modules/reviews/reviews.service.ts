import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './schema/review.schema';
import { UpdateReviewDto } from './dto/updateReview.dto';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) { }

  /**
   * metodo encargado de crear una reseña de un lugar en especifico
   * @param reviewData 
   * @returns {Review}
   */
  async create(reviewData: Partial<Review>): Promise<Review> {
    if ((reviewData?.rating || 0) > 5 || (reviewData?.rating || 0) < 0) {
      throw new BadRequestException(`La calificación permitida va desde 0 hasta 5`);
    }
    return new this.reviewModel(reviewData).save();
  }

  /**
  * metodo encargado de obtener las reseñas de un lugar en especifico (busca por id del lugar)
  * @param reviewData 
  * @returns {Review[]}
  */
  async findAllByPlace(placeId: string): Promise<Review[]> {
    return this.reviewModel.find({ placeId }).exec();
  }
  
  /**
   * Actualiza un historial de cambios por su ID
   * @param id 
   * @param updateData 
   * @returns {Promise<QuestionAnswer>}
   */
  async update(id: string, updateData: UpdateReviewDto): Promise<Review> {
    const updatedChangeHistory = await this.reviewModel
      .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .exec();
    if (!updatedChangeHistory) {
      throw new NotFoundException(`pregunta con ID ${id} no encontrada`);
    }
    return updatedChangeHistory;
  }

  /**
   * Elimina un historial de cambios por su ID
   * @param id 
   * @returns {Promise<{ message: string }>}
   */
  async delete(id: string): Promise<{ message: string }> {
    const result = await this.reviewModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`la pregunta con ID ${id} no encontrada`);
    }
    return { message: `pregunta con ID ${id} eliminada correctamente` };
  }
}
