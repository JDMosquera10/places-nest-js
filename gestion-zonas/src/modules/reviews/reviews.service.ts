import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './schema/review.schema';

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
}
