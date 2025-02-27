import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { CreateLabelPlaceDto } from './dto/create-label-place.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Place } from './entities/place.entity';

/**
 * Controlador que maneja las operaciones relacionadas con los lugares.
 */
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) { }

  /**
   * Crea un nuevo lugar.
   *
   * @param createPlaceDto Datos del nuevo lugar.
   * @returns El lugar creado.
   */
  @Post()
  @ApiOperation({ summary: 'Crear un lugar' })
  @ApiResponse({ status: 201, description: 'Lugar creado correctamente.', type: Place })
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placesService.create(createPlaceDto);
  }

  /**
   * Obtiene todos los lugares.
   *
   * @returns Lista de lugares.
   */
  @Get()
  @ApiOperation({ summary: 'Obtener todos los lugares' })
  @ApiResponse({ status: 200, description: 'Lista de lugares.', type: [Place] })
  findAll() {
    return this.placesService.findAll();
  }

  /**
   * Obtiene un lugar por su ID.
   *
   * @param id Identificador del lugar.
   * @returns El lugar encontrado.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un lugar por ID' })
  @ApiResponse({ status: 200, description: 'Lugar encontrado.', type: Place })
  @ApiResponse({ status: 404, description: 'Lugar no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.placesService.findOne(+id);
  }

  /**
   * Actualiza un lugar por su ID.
   *
   * @param id Identificador del lugar.
   * @param updatePlaceDto Datos actualizados del lugar.
   * @returns El lugar actualizado.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un lugar por ID' })
  @ApiResponse({ status: 200, description: 'Lugar actualizado.', type: Place })
  @ApiResponse({ status: 404, description: 'Lugar no encontrado.' })
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placesService.update(+id, updatePlaceDto);
  }

  /**
   * Elimina un lugar por su ID.
   *
   * @param id Identificador del lugar.
   * @returns Mensaje de confirmación de eliminación.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un lugar por ID' })
  @ApiResponse({ status: 200, description: 'Lugar eliminado.' })
  @ApiResponse({ status: 404, description: 'Lugar no encontrado.' })
  remove(@Param('id') id: string) {
    return this.placesService.remove(+id);
  }

  /**
   * Asocia una etiqueta a un lugar.
   *
   * @param dto Datos de la asociación entre lugar y etiqueta.
   * @returns Mensaje de confirmación de asociación.
   */
  @Post('add-labels')
  @ApiOperation({ summary: 'Asociar una etiqueta a un lugar' })
  @ApiResponse({ status: 200, description: 'Lugar asociado correctamente.' })
  @ApiResponse({ status: 404, description: 'Lugar no asociado.' })
  async addLabels(@Body() dto: CreateLabelPlaceDto) {
    return this.placesService.addLabelToPlace(dto.place_id, dto.label_id);
  }
}
