import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Category } from './entities/category.entity';

/**
 * Controlador para gestionar las operaciones de categorías.
 */
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) { }

    /**
     * Crea una nueva categoría.
     */
    @Post()
    @ApiOperation({ summary: 'Crear una nueva categoria' })
    @ApiResponse({ status: 201, description: 'Categoria creada correctamente.', type: Category })
    create(@Body() createPlaceDto: CreateCategoryDto) {
        return this.categoryService.create(createPlaceDto);
    }

    /**
     * Obtiene todas las categorías.
     */
    @Get()
    @ApiOperation({ summary: 'Obtener todas las categorias' })
    @ApiResponse({ status: 200, description: 'Lista de categorias.', type: [Category] })
    findAll() {
        return this.categoryService.findAll();
    }

    /**
     * Obtiene una categoría por su ID.
     */
    @Get(':id')
    @ApiOperation({ summary: 'Obtener una categoria por ID' })
    @ApiResponse({ status: 200, description: 'Categoria encontrada.', type: Category })
    @ApiResponse({ status: 404, description: 'Categoria no encontrada.' })
    findOne(@Param('id') id: string) {
        return this.categoryService.findOne(+id);
    }

    /**
     * Actualiza una categoría por su ID.
     */
    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar una categoria por ID' })
    @ApiResponse({ status: 200, description: 'Categoria actualizada.', type: Category })
    @ApiResponse({ status: 404, description: 'Categoria no encontrada.' })
    update(@Param('id') id: string, @Body() updatePlaceDto: UpdateCategoryDto) {
        return this.categoryService.update(+id, updatePlaceDto);
    }

    /**
     * Elimina una categoría por su ID.
     */
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una categoria por ID' })
    @ApiResponse({ status: 200, description: 'Categoria eliminada.' })
    @ApiResponse({ status: 404, description: 'Categoria no encontrada.' })
    remove(@Param('id') id: string) {
        return this.categoryService.remove(+id);
    }
}
