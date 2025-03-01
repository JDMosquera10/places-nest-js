import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Label } from './entities/label.entity';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { ChangeHistoryService } from '../changeHistory/changeHistory.service';

@Injectable()
export class LabelsService {
    constructor(
        @InjectRepository(Label)
        private readonly labelRepository: Repository<Label>,
        private readonly changeHistoryService: ChangeHistoryService
    ) { }

    /**
    * metodo encargado de crear las etiqueta 
    * @param CreateLabelDto 
    * @returns {Label}
    */
    async create(createLabelDto: CreateLabelDto): Promise<Label> {
        try {
        const newLabel = this.labelRepository.create(createLabelDto);
        await this.changesSave('creación de etiqueta');
        return await this.labelRepository.save(newLabel);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error inesperado al crear la etiqueta');
        }
    }

    /**
    * metodo encargado de retornar todas las etiqueta
    * @returns {Label[]}
    */
    async findAll(): Promise<Label[]> {
        try {
        return await this.labelRepository.find();
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error inesperado al obtener las etiquetas');
        }
    }

     /**
    * metodo encargado de retornar una etiqueta por id 
    * @param id 
    * @returns {Label}
    */
    async findOne(id: number): Promise<Label> {
        try {
        const label = await this.labelRepository.findOne({ where: { id } });
        if (!label) {
            throw new NotFoundException(`La etiqueta con ID ${id} no existe`);
        }
        return label;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error inesperado al obtener la etiqueta');
        }
    }

    /**
      * metodo encargado de actualizar una etiqueta
      * @param id 
      * @param CreateLabelDto 
      * @returns {Label}
      */
    async update(id: number, updateLabelDto: UpdateLabelDto): Promise<Label> {
        try {
        const label = await this.findOne(id);
        if (!label) {
            throw new NotFoundException(`La etiqueta con ID ${id} no existe`);
        }
        await this.changesSave('actualización de etiqueta');
        const updatedLabel = Object.assign(label, updateLabelDto);
        return await this.labelRepository.save(updatedLabel);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error inesperado al actualizar la etiqueta');
        }
    }

     /**
     * metodo encargado de eliminar una etiqueta
     * @param id 
     */
    async remove(id: number): Promise<void> {
        try {
        const label = await this.findOne(id);
        if (!label) {
            throw new NotFoundException(`La etiqueta con ID ${id} no existe`);
        }
        await this.changesSave('eliminación de etiqueta');
        await this.labelRepository.remove(label);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error inesperado al eliminar la etiqueta');
        }
    }

    /**
   * guarda los cambios en la base de datos implementando el servicio de changeHistory
   * @param reason 
   * @returns 
   */
    changesSave(reason: string) {
        try {
        return this.changeHistoryService.create({
            placeId: 1,
            changes: { category: 'Label' },
            reason
        });
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error inesperado al guardar los cambios');
        }
    }
}
