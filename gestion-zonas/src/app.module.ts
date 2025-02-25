import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlacesModule } from './modules/places/places.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { DatabaseModule } from './config/database.module';
import { MultimediasModule } from './modules/multimedia/multimedia.module';
import { LabelsModule } from './modules/labels/labels.module';
import { ReviewModule } from './modules/reviews/reviews.module';
import { QuestionAnswerModule } from './modules/questionAnswer/questionAnswer.module';
import { ChangeHistoryModule } from './modules/changeHistory/changeHistory.module';

@Module({
  imports: [
    CategoriesModule,
    LabelsModule,
    PlacesModule,
    MultimediasModule,
    ReviewModule,
    QuestionAnswerModule,
    ChangeHistoryModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
