import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangeHistory } from './schema/changeHistory.schema';
import { CreateChangeHistoryDto } from './dto/changeHistory.dto';

@Injectable()
export class ChangeHistoryService {
  constructor(@InjectModel(ChangeHistory.name) private changehistoryModel: Model<ChangeHistory>) { }

  /**
   * metodo encargado de crear el historia de cambio o si ya existe agrega cambios al lugar
   * @param changehistoryData 
   * @returns {ChangeHistory}
   */
  async create(changehistoryData: CreateChangeHistoryDto): Promise<ChangeHistory> {
    return new this.changehistoryModel(changehistoryData).save();
  }

  /**
   * metodo que obtiene el historias de cambios de un lugar (busca por el id del lugar)
   * @param placeId 
   * @returns {ChangeHistory[]}
   */
  async findAllByPlace(placeId: string): Promise<ChangeHistory[]> {
    return this.changehistoryModel.find({ placeId }).exec();
  }
}
