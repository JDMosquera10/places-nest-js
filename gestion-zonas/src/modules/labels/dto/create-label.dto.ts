import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, isNumber, isNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateLabelDto {
  @ApiProperty({ example: 'etiqueta_1', description: 'Nombre de la etiqueta' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
