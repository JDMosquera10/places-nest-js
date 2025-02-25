import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, isNumber, isNotEmpty, IsOptional, IsInt, IsIn } from 'class-validator';

export class CreateLabelPlaceDto {
  @ApiProperty({ example: 1, description: 'lugar de la etiqueta que se asocia' })
  @IsInt()
  @IsNotEmpty()
  place_id: number;

  @ApiProperty({ example: 1, description: 'etiqueta que se le asocia al lugar' })
  @IsInt()
  @IsNotEmpty()
  label_id: number;
}
