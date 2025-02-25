import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, isNumber, isNotEmpty, IsOptional, IsInt, isString } from 'class-validator';

export class CreateMultimediaDto {
  @ApiProperty({ example: 'imagen', description: 'tipo de multimedia guardada puede ser video o imagen' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 'base64', description: 'path de la imagen, url o base64' })
  @IsString()
  @IsNotEmpty()
  path: string;

  @ApiProperty({ example: 1, description: 'lugar al que esta asociado la multimedia' })
  @IsInt()
  @IsNotEmpty()
  place_id: number;
}
