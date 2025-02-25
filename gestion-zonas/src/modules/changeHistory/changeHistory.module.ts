import { Module } from '@nestjs/common';
import { ChangeHistory, ChangeHistorySchema } from './schema/changeHistory.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ChangeHistoryController } from './changeHistory.controller';
import { ChangeHistoryService } from './changeHistory.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: ChangeHistory.name, schema: ChangeHistorySchema }])],
  controllers: [ChangeHistoryController],
  providers: [ChangeHistoryService]
})
export class ChangeHistoryModule { }
