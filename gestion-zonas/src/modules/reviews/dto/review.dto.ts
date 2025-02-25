import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ example: 1, description: 'ID del lugar' })
  placeId: number;

  @ApiProperty({ example: 5, description: 'Calificación de 1 a 5 estrellas' })
  rating: number;

  @ApiProperty({ example: 'Lugar excelente, muy recomendado', description: 'Comentario del usuario' })
  comment: string;

  @ApiProperty({ example: ['imagen1.jpg', 'video1.mp4'], description: 'URLs de imágenes o videos', required: false })
  media?: string[];
}
