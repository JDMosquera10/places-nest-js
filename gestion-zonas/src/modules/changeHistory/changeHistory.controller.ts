import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ChangeHistoryService } from './changeHistory.service';
import { CreateChangeHistoryDto } from './dto/changeHistory.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChangeHistory } from './schema/changeHistory.schema';
import { UpdateChangeHistoryDto } from './dto/updarteChangeHistory.dto';

/**
 * Controlador que maneja las operaciones relacionadas con el historial de cambios.
 */
@Controller('changehistorys')
export class ChangeHistoryController {
  constructor(private readonly changeHistoryService: ChangeHistoryService) { }

   /**
   * Crea un nuevo registro en el historial de cambios.
   *
   * @param changeHistoryData Datos del nuevo registro en el historial de cambios.
   * @returns Un mensaje indicando que el registro fue creado exitosamente.
   */
  @Post()
  @ApiOperation({ summary: 'Crear una nueva reseña' })
  @ApiResponse({ status: 201, description: 'Reseña creada exitosamente.' })
  async create(@Body() changeHistoryData: CreateChangeHistoryDto) {
    return this.changeHistoryService.create(changeHistoryData);
  }

  /**
   * Obtiene el historial de cambios para un lugar específico.
   *
   * @param placeId Identificador del lugar para el cual se desea obtener el historial de cambios.
   * @returns El historial de cambios para el lugar especificado.
   */
  @Get(':placeId')
  @ApiOperation({ summary: 'Crear una nueva reseña' })
  @ApiResponse({ status: 201, description: 'Reseña creada exitosamente.' })
  async getChangeHistorys(@Param('placeId') placeId: string) {
    return this.changeHistoryService.findAllByPlace(placeId);
  }

  /**
   * Actualiza un historial de cambios por su ID
   * @param id 
   * @param updateChangeHistoryDto 
   * @returns {Promise<ChangeHistory>}
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Crear una nueva reseña' })
  @ApiResponse({ status: 201, description: 'Reseña creada exitosamente.' })
  async update(
    @Param('id') id: string,
    @Body() updateChangeHistoryDto: UpdateChangeHistoryDto,
  ): Promise<ChangeHistory> {
    return this.changeHistoryService.update(id, updateChangeHistoryDto);
  }

  /**
   * Elimina un historial de cambios por su ID
   * @param id 
   * @returns {Promise<{ message: string }>}
   */
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.changeHistoryService.delete(id);
  }
}
