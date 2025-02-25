import { Module } from '@nestjs/common';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { LabelPlace } from './entities/label-place';
import { Category } from '../categories/entities/category.entity';
import { Label } from '../labels/entities/label.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place, LabelPlace, Category, Label])],
  controllers: [PlacesController],
  providers: [PlacesService]
})
export class PlacesModule {}
