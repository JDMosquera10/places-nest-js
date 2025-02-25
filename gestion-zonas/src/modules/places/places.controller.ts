import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { CreateLabelPlaceDto } from './dto/create-label-place.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Place } from './entities/place.entity';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) { }

  @Post()
  @ApiOperation({ summary: 'Crear un lugar' })
  @ApiResponse({ status: 201, description: 'Lugar creado correctamente.', type: Place })
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placesService.create(createPlaceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los lugares' })
  @ApiResponse({ status: 200, description: 'Lista de Lugares.', type: [Place] })
  findAll() {
    return this.placesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un lugar por ID' })
  @ApiResponse({ status: 200, description: 'Lugar encontrado.', type: Place })
  @ApiResponse({ status: 404, description: 'Lugar no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.placesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un lugar por ID' })
  @ApiResponse({ status: 200, description: 'Lugar actualizado.', type: Place })
  @ApiResponse({ status: 404, description: 'Lugar no encontrado.' })
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placesService.update(+id, updatePlaceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un lugar por ID' })
  @ApiResponse({ status: 200, description: 'Lugar eliminado.' })
  @ApiResponse({ status: 404, description: 'Lugar no encontrado.' })
  remove(@Param('id') id: string) {
    return this.placesService.remove(+id);
  }

  @Post('add-labels')
  @ApiOperation({ summary: 'asociarle una etiqueta a un lugar' })
  @ApiResponse({ status: 200, description: 'Lugar asociado correctamente.' })
  @ApiResponse({ status: 404, description: 'Lugar no asociado.' })
  async addLabels(@Body() dto: CreateLabelPlaceDto) {
    return this.placesService.addLabelToPlace(dto.place_id, dto.label_id);
  }
}
