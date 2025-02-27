import { Module } from '@nestjs/common';
import { ReviewController } from './reviews.controller';
import { ReviewService } from './reviews.service';
import { Review, ReviewSchema } from './schema/review.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from '../places/entities/place.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]), TypeOrmModule.forFeature([Place])],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule { }
