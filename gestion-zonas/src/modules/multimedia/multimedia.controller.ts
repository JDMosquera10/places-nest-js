import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MultimediasService } from './multimedia.service';
import { CreateMultimediaDto } from './dto/create-multimedia.dto';
import { UpdateMultimediaDto } from './dto/update-multimedia.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Multimedia } from './entities/multimedia.entity';

@Controller('multimedias')
export class MultimediasController {
  constructor(private readonly multimediasService: MultimediasService) { }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva multimedia' })
  @ApiResponse({ status: 201, description: 'Multimedia creada correctamente.', type: Multimedia })
  create(@Body() createMultimediaDto: CreateMultimediaDto) {
    return this.multimediasService.create(createMultimediaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las multimedias' })
  @ApiResponse({ status: 200, description: 'Lista de multimedias.', type: [Multimedia] })
  findAll() {
    return this.multimediasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una Multimedia por ID' })
  @ApiResponse({ status: 200, description: 'Multimedia encontrada.', type: Multimedia })
  @ApiResponse({ status: 404, description: 'Multimedia no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.multimediasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una multimedia por ID' })
  @ApiResponse({ status: 200, description: 'Multimedia actualizada.', type: Multimedia })
  @ApiResponse({ status: 404, description: 'Multimedia no encontrada.' })
  update(@Param('id') id: string, @Body() updateMultimediaDto: UpdateMultimediaDto) {
    return this.multimediasService.update(+id, updateMultimediaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una multimedia por ID' })
  @ApiResponse({ status: 200, description: 'Multimedia eliminada.' })
  @ApiResponse({ status: 404, description: 'Multimedia no encontrada.' })
  remove(@Param('id') id: string) {
    return this.multimediasService.remove(+id);
  }
}
