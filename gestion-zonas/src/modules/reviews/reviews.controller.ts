import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ReviewService } from './reviews.service';
import { Review } from './schema/review.schema';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/review.dto';
import { UpdateReviewDto } from './dto/updateReview.dto';

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
      @Body() updateChangeHistoryDto: UpdateReviewDto,
    ): Promise<Review> {
      return this.reviewService.update(id, updateChangeHistoryDto);
    }
  
    /**
     * Elimina una pregunta por su ID
     * @param id 
     * @returns {Promise<{ message: string }>}
     */
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<{ message: string }> {
      return this.reviewService.delete(id);
    }
}
