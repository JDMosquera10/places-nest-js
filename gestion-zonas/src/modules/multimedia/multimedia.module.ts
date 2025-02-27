import { Module } from '@nestjs/common';
import { MultimediasController } from './multimedia.controller';
import { MultimediasService } from './multimedia.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Multimedia } from './entities/multimedia.entity';
import { Place } from '../places/entities/place.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ChangeHistory, ChangeHistorySchema } from '../changeHistory/schema/changeHistory.schema';
import { ChangeHistoryService } from '../changeHistory/changeHistory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Multimedia, Place]), MongooseModule.forFeature([{ name: ChangeHistory.name, schema: ChangeHistorySchema }])],
  controllers: [MultimediasController],
  providers: [MultimediasService, ChangeHistoryService]
})
export class MultimediasModule {}
