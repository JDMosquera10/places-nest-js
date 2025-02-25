import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReviewService } from './reviews.service';
import { Review } from './schema/review.schema';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva reseña' })
  @ApiResponse({ status: 201, description: 'Reseña creada exitosamente.' })
  async create(@Body() reviewData: CreateReviewDto) {
    return this.reviewService.create(reviewData);
  }

  @Get(':placeId')
  @ApiOperation({ summary: 'Obtener reseñas de un lugar' })
  @ApiResponse({ status: 200, description: 'Lista de reseñas.' })
  async getReviews(@Param('placeId') placeId: string) {
    return this.reviewService.findAllByPlace(placeId);
  }
}
