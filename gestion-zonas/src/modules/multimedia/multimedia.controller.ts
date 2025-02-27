import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MultimediasService } from './multimedia.service';
import { CreateMultimediaDto } from './dto/create-multimedia.dto';
import { UpdateMultimediaDto } from './dto/update-multimedia.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Multimedia } from './entities/multimedia.entity';

/**
 * Controlador que maneja las operaciones relacionadas con los archivos multimedia.
 */
@Controller('multimedias')
export class MultimediasController {
  constructor(private readonly multimediasService: MultimediasService) { }

  /**
   * Crea un nuevo archivo multimedia.
   *
   * @param createMultimediaDto Datos del nuevo archivo multimedia.
   * @returns El archivo multimedia creado.
   */
  @Post()
  @ApiOperation({ summary: 'Crear una nueva multimedia' })
  @ApiResponse({ status: 201, description: 'Multimedia creada correctamente.', type: Multimedia })
  create(@Body() createMultimediaDto: CreateMultimediaDto) {
    return this.multimediasService.create(createMultimediaDto);
  }

  /**
   * Obtiene todos los archivos multimedia.
   *
   * @returns Lista de archivos multimedia.
   */
  @Get()
  @ApiOperation({ summary: 'Obtener todas las multimedias' })
  @ApiResponse({ status: 200, description: 'Lista de multimedias.', type: [Multimedia] })
  findAll() {
    return this.multimediasService.findAll();
  }

  /**
   * Obtiene un archivo multimedia por su ID.
   *
   * @param id Identificador del archivo multimedia.
   * @returns El archivo multimedia encontrado.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una multimedia por ID' })
  @ApiResponse({ status: 200, description: 'Multimedia encontrada.', type: Multimedia })
  @ApiResponse({ status: 404, description: 'Multimedia no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.multimediasService.findOne(+id);
  }

  /**
   * Actualiza un archivo multimedia por su ID.
   *
   * @param id Identificador del archivo multimedia.
   * @param updateMultimediaDto Datos actualizados del archivo multimedia.
   * @returns El archivo multimedia actualizado.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una multimedia por ID' })
  @ApiResponse({ status: 200, description: 'Multimedia actualizada.', type: Multimedia })
  @ApiResponse({ status: 404, description: 'Multimedia no encontrada.' })
  update(@Param('id') id: string, @Body() updateMultimediaDto: UpdateMultimediaDto) {
    return this.multimediasService.update(+id, updateMultimediaDto);
  }

  /**
   * Elimina un archivo multimedia por su ID.
   *
   * @param id Identificador del archivo multimedia.
   * @returns Mensaje de confirmación de eliminación.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una multimedia por ID' })
  @ApiResponse({ status: 200, description: 'Multimedia eliminada.' })
  @ApiResponse({ status: 404, description: 'Multimedia no encontrada.' })
  remove(@Param('id') id: string) {
    return this.multimediasService.remove(+id);
  }
}
