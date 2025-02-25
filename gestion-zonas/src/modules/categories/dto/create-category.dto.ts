import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({ example: 'Categoria_1', description: 'Nombre de la categoria' })
    @IsString()
    @IsNotEmpty()
    name: string;
}
