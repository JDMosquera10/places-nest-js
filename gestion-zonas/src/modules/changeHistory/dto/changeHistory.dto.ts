import { ApiProperty } from '@nestjs/swagger';

export class CreateChangeHistoryDto {
  @ApiProperty({ example: 1, description: 'ID del lugar' })
  placeId: number;

  @ApiProperty({ example: 5, description: 'Calificación de 1 a 5 estrellas' })
  changes: Record<string, any>;

  @ApiProperty({ example: 'Lugar excelente, muy recomendado', description: 'Comentario del usuario' })
  reason: string;
}
