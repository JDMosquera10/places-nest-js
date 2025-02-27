import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChangeHistoryService } from '../changeHistory/changeHistory.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChangeHistory, ChangeHistorySchema } from '../changeHistory/schema/changeHistory.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), MongooseModule.forFeature([{ name: ChangeHistory.name, schema: ChangeHistorySchema }])],
  controllers: [CategoriesController],
  providers: [CategoriesService, ChangeHistoryService]
})
export class CategoriesModule { }
