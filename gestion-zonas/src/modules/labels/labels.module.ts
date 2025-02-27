import { Module } from '@nestjs/common';
import { LabelsController } from './labels.controller';
import { LabelsService } from './labels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from './entities/label.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ChangeHistory, ChangeHistorySchema } from '../changeHistory/schema/changeHistory.schema';
import { ChangeHistoryService } from '../changeHistory/changeHistory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Label]), MongooseModule.forFeature([{ name: ChangeHistory.name, schema: ChangeHistorySchema }])],
  controllers: [LabelsController],
  providers: [LabelsService, ChangeHistoryService]
})
export class LabelsModule {}
