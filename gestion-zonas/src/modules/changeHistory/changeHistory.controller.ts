import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChangeHistoryService } from './changeHistory.service';
import { CreateChangeHistoryDto } from './dto/changeHistory.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('changehistorys')
export class ChangeHistoryController {
  constructor(private readonly changehistoryService: ChangeHistoryService) { }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva reseña' })
  @ApiResponse({ status: 201, description: 'Reseña creada exitosamente.' })
  async create(@Body() changeHistoryData: CreateChangeHistoryDto) {
    return this.changehistoryService.create(changeHistoryData);
  }

  @Get(':placeId')
  @ApiOperation({ summary: 'Crear una nueva reseña' })
  @ApiResponse({ status: 201, description: 'Reseña creada exitosamente.' })
  async getChangeHistorys(@Param('placeId') placeId: string) {
    return this.changehistoryService.findAllByPlace(placeId);
  }
}
