import { Module } from '@nestjs/common';
import { MultimediasController } from './multimedia.controller';
import { MultimediasService } from './multimedia.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Multimedia } from './entities/multimedia.entity';
import { Place } from '../places/entities/place.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Multimedia, Place])],
  controllers: [MultimediasController],
  providers: [MultimediasService]
})
export class MultimediasModule {}
