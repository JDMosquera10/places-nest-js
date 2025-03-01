import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './schema/review.schema';
import { UpdateReviewDto } from './dto/updateReview.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from '../places/entities/place.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<Review>, // Inyecta el modelo de Mongoose
    @InjectRepository(Place) // Inyecta el repositorio de TypeORM
    private readonly placeRepository: Repository<Place>,
  ) { }

  /**
   * metodo encargado de crear una reseña de un lugar en especifico
   * @param reviewData 
   * @returns {Review}
   */
  async create(reviewData: Partial<Review>): Promise<Review> {
    try {
    if ((reviewData?.rating || 0) > 5 || (reviewData?.rating || 0) < 0) {
      throw new BadRequestException(`La calificación permitida va desde 0 hasta 5`);
    }
    return new this.reviewModel(reviewData).save();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error inesperado al crear la reseña');
    }
  }

  /**
  * metodo encargado de obtener las reseñas de un lugar en especifico (busca por id del lugar)
  * @param reviewData 
  * @returns {Review[]}
  */
  async findAllByPlace(placeId: string): Promise<Review[]> {
    try {
    return this.reviewModel.find({ placeId }).exec();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error inesperado al obtener las reseñas');
    }
  }
  
  /**
   * Actualiza un historial de cambios por su ID
   * @param id 
   * @param updateData 
   * @returns {Promise<QuestionAnswer>}
   */
  async update(id: string, updateData: UpdateReviewDto): Promise<Review> {
    try {
    if ((updateData?.rating || 0) > 5 || (updateData?.rating || 0) < 0) {
      throw new BadRequestException(`La calificación permitida va desde 0 hasta 5`);
    }
     // Verifica si el lugar existe
     const place = await this.placeRepository.findOne({ where: { id: updateData.placeId } });
     if (!place) {
       throw new NotFoundException(`El lugar que estas buscando no existe`);
     }
    const updatedChangeHistory = await this.reviewModel
      .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .exec();
    if (!updatedChangeHistory) {
      throw new NotFoundException(`pregunta con ID ${id} no encontrada`);
    }
    return updatedChangeHistory;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error inesperado al actualizar la reseña');
    }
  }

  /**
   * Elimina un historial de cambios por su ID
   * @param id 
   * @returns {Promise<{ message: string }>}
   */
  async delete(id: string): Promise<{ message: string }> {
    try {
    const result = await this.reviewModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`la pregunta con ID ${id} no encontrada`);
    }
    return { message: `reseña con ID ${id} eliminada correctamente` };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error inesperado al eliminar la reseña');
    }
  }
}
