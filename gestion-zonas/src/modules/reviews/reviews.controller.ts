import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ReviewService } from './reviews.service';
import { Review } from './schema/review.schema';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/review.dto';
import { UpdateReviewDto } from './dto/updateReview.dto';

/**
 * Controlador que maneja las operaciones relacionadas con las reseñas.
 */
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  /**
   * Crea una nueva reseña.
   *
   * @param reviewData Datos de la nueva reseña.
   * @returns Mensaje de confirmación de creación.
   */
  @Post()
  @ApiOperation({ summary: 'Crear una nueva reseña' })
  @ApiResponse({ status: 201, description: 'Reseña creada exitosamente.' })
  async create(@Body() reviewData: CreateReviewDto) {
    return this.reviewService.create(reviewData);
  }

  /**
   * Obtiene las reseñas de un lugar.
   *
   * @param placeId Identificador del lugar.
   * @returns Lista de reseñas asociadas al lugar.
   */
  @Get(':placeId')
  @ApiOperation({ summary: 'Obtener reseñas de un lugar' })
  @ApiResponse({ status: 200, description: 'Lista de reseñas.' })
  async getReviews(@Param('placeId') placeId: string) {
    return this.reviewService.findAllByPlace(placeId);
  }

  /**
   * Actualiza una reseña por su ID.
   *
   * @param id Identificador de la reseña.
   * @param updateReviewDto Datos actualizados de la reseña.
   * @returns La reseña actualizada.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Editar una reseña' })
  @ApiResponse({ status: 200, description: 'Reseña editada exitosamente.' })
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewService.update(id, updateReviewDto);
  }

  /**
   * Elimina una reseña por su ID.
   *
   * @param id Identificador de la reseña.
   * @returns Mensaje de confirmación de eliminación.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una reseña por ID' })
  @ApiResponse({ status: 200, description: 'Reseña eliminada exitosamente.' })
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.reviewService.delete(id);
  }
}
