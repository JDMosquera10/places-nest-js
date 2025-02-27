import { Module } from '@nestjs/common';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { LabelPlace } from './entities/label-place';
import { Category } from '../categories/entities/category.entity';
import { Label } from '../labels/entities/label.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ChangeHistory, ChangeHistorySchema } from '../changeHistory/schema/changeHistory.schema';
import { ChangeHistoryService } from '../changeHistory/changeHistory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Place, LabelPlace, Category, Label]), MongooseModule.forFeature([{ name: ChangeHistory.name, schema: ChangeHistorySchema }])],
  controllers: [PlacesController],
  providers: [PlacesService, ChangeHistoryService]
})
export class PlacesModule {}
