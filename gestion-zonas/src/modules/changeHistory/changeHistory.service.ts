import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangeHistory } from './schema/changeHistory.schema';
import { CreateChangeHistoryDto } from './dto/changeHistory.dto';
import { UpdateChangeHistoryDto } from './dto/updarteChangeHistory.dto';

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

  /**
   * Actualiza un historial de cambios por su ID
   * @param id 
   * @param updateData 
   * @returns {Promise<ChangeHistory>}
   */
  async update(id: string, updateData: UpdateChangeHistoryDto): Promise<ChangeHistory> {
    const updatedChangeHistory = await this.changehistoryModel
      .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .exec();
    if (!updatedChangeHistory) {
      throw new NotFoundException(`Historial con ID ${id} no encontrado`);
    }
    return updatedChangeHistory;
  }

  /**
   * Elimina un historial de cambios por su ID
   * @param id 
   * @returns {Promise<{ message: string }>}
   */
  async delete(id: string): Promise<{ message: string }> {
    const result = await this.changehistoryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Historial con ID ${id} no encontrado`);
    }
    return { message: `Historial con ID ${id} eliminado correctamente` };
  }
}
