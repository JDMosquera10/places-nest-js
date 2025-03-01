import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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
    try {
    return new this.changehistoryModel(changehistoryData).save();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error inesperado al crear el historial de cambios');
    }
  }

  /**
   * metodo que obtiene el historias de cambios de un lugar (busca por el id del lugar)
   * @param placeId 
   * @returns {ChangeHistory[]}
   */
  async findAllByPlace(placeId: string): Promise<ChangeHistory[]> {
    try {
    return this.changehistoryModel.find({ placeId }).exec();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error inesperado al obtener los historiales de cambios');
    }
  }

  /**
   * Actualiza un historial de cambios por su ID
   * @param id 
   * @param updateData 
   * @returns {Promise<ChangeHistory>}
   */
  async update(id: string, updateData: UpdateChangeHistoryDto): Promise<ChangeHistory> {
    try {
    const updatedChangeHistory = await this.changehistoryModel
      .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .exec();
    if (!updatedChangeHistory) {
      throw new NotFoundException(`Historial con ID ${id} no encontrado`);
    }
    return updatedChangeHistory;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error inesperado al actualizar el historial de cambios');
    }
  }

  /**
   * Elimina un historial de cambios por su ID
   * @param id 
   * @returns {Promise<{ message: string }>}
   */
  async delete(id: string): Promise<{ message: string }> {
    try {
    const result = await this.changehistoryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Historial con ID ${id} no encontrado`);
    }
    return { message: `Historial con ID ${id} eliminado correctamente` };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error inesperado al eliminar el historial de cambios');
    }
  }
}
