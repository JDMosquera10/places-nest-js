import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LabelsService } from './labels.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Label } from './entities/label.entity';

/**
 * Controlador que maneja las operaciones relacionadas con las etiquetas.
 */
@Controller('labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) { }

  /**
   * Crea una nueva etiqueta.
   *
   * @param createLabelDto Datos de la nueva etiqueta.
   * @returns La etiqueta creada.
   */
  @Post()
  @ApiOperation({ summary: 'Crear una nueva etiqueta' })
  @ApiResponse({ status: 201, description: 'Etiqueta creada correctamente.', type: Label })
  create(@Body() createLabelDto: CreateLabelDto) {
    return this.labelsService.create(createLabelDto);
  }

  /**
   * Obtiene todas las etiquetas.
   *
   * @returns Lista de etiquetas.
   */
  @Get()
  @ApiOperation({ summary: 'Obtener todas las etiquetas' })
  @ApiResponse({ status: 200, description: 'Lista de etiquetas.', type: [Label] })
  findAll() {
    return this.labelsService.findAll();
  }

  /**
   * Obtiene una etiqueta por su ID.
   *
   * @param id Identificador de la etiqueta.
   * @returns La etiqueta encontrada.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una etiqueta por ID' })
  @ApiResponse({ status: 200, description: 'Etiqueta encontrada.', type: Label })
  @ApiResponse({ status: 404, description: 'Etiqueta no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.labelsService.findOne(+id);
  }

  /**
   * Actualiza una etiqueta por su ID.
   *
   * @param id Identificador de la etiqueta.
   * @param updateLabelDto Datos actualizados de la etiqueta.
   * @returns La etiqueta actualizada.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una etiqueta por ID' })
  @ApiResponse({ status: 200, description: 'Etiqueta actualizada.', type: Label })
  @ApiResponse({ status: 404, description: 'Etiqueta no encontrada.' })
  update(@Param('id') id: string, @Body() updateLabelDto: UpdateLabelDto) {
    return this.labelsService.update(+id, updateLabelDto);
  }

  /**
   * Elimina una etiqueta por su ID.
   *
   * @param id Identificador de la etiqueta.
   * @returns Mensaje de confirmación de eliminación.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una etiqueta por ID' })
  @ApiResponse({ status: 200, description: 'Etiqueta eliminada.' })
  @ApiResponse({ status: 404, description: 'Etiqueta no encontrada.' })
  remove(@Param('id') id: string) {
    return this.labelsService.remove(+id);
  }
}
