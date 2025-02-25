import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, isNumber, isNotEmpty, IsOptional, IsInt, IsNumber } from 'class-validator';

export class CreatePlaceDto {
  @ApiProperty({ example: "lugar_1", description: 'Nombre del lugar o zona' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "dirección_1", description: 'direccion donde se ubica el lugar o zona' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: "tipo-1", description: 'Tipo de lugar o zona' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: "3pm - 6pm", description: 'horario de funcionamiento' })
  @IsString()
  schedule: string;

  @ApiProperty({ example: "breve descripción", description: 'breve descripción del lugar o zona' })
  @IsString()
  description: string;

  @ApiProperty({ example: 1, description: 'catgegoria a la cual se asocia'})
  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}
