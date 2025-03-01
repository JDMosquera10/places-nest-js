import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from './entities/place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Label } from '../labels/entities/label.entity';
import { LabelPlace } from './entities/label-place';
import { Category } from '../categories/entities/category.entity';
import { ChangeHistoryService } from '../changeHistory/changeHistory.service';


@Injectable()
export class PlacesService {
    constructor(
        @InjectRepository(Place)
        private readonly placeRepository: Repository<Place>,
        @InjectRepository(Label)
        private readonly labelRepository: Repository<Label>,
        @InjectRepository(LabelPlace)
        private readonly labelPlaceRepository: Repository<LabelPlace>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        private readonly changeHistoryService: ChangeHistoryService 
    ) { }

    /**
    * metodo encargado de crear los lugares 
    * @param createPlaceDto 
    * @returns {Place}
    */
    async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
        try {
        const category = await this.categoryRepository.findOne({ where: { id: createPlaceDto.category_id } });

        if (!category) {
            throw new Error('Category not found');
        }

        const newPlace = this.placeRepository.create({
            ...createPlaceDto,
            category_id: category,
        });

        return await this.placeRepository.save(newPlace);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error inesperado al crear el lugar');
        }
    }

    /**
* metodo encargado de retornar todos los lugares
* @returns {Place[]}
*/
    async findAll(): Promise<Place[]> {
        try {
        return await this.placeRepository.find();
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error inesperado al obtener los lugares');
        }
    }

    /**
  * metodo encargado de retornar un lugar por id 
  * @param id 
  * @returns {Place}
  */
    async findOne(id: number): Promise<Place> {
        try {
        const place = await this.placeRepository.findOne({ where: { id } });
        if (!place) {
            throw new NotFoundException(`El lugar con ID ${id} no existe`);
        }
        return place;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error inesperado al obtener el lugar');
        }
    }

    /**
    * metodo encargado de actualizar un lugar
    * @param id 
    * @param UpdatePlaceDto 
    * @returns {Place}
    */
    async update(id: number, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
        try {
        const place = await this.findOne(id);
        // buscar la categoria
        const category = await this.categoryRepository.findOne({ where: { id: updatePlaceDto.category_id } });

        if (!category) {
            throw new Error('Category not found');
        }

        if (!place) {
            throw new NotFoundException(`El lugar con ID ${id} no existe`);
        }

        const updatedPlace = Object.assign(place, updatePlaceDto);
        return await this.placeRepository.save(updatedPlace);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error inesperado al actualizar el lugar');
        }
    }

    /**
     * metodo encargado de eliminar un lugar
     * @param id 
     */
    async remove(id: number): Promise<void> {
        try {
        const place = await this.findOne(id);
        await this.placeRepository.remove(place);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error inesperado al eliminar el lugar');
        }
    }

    /**
    * metodo encargado de asociar o agregarle una etiqueta a un lugar
    * @param placeId 
    * @param labelId 
    */
    async addLabelToPlace(placeId: number, labelId: number) {
        try {
        const place = await this.placeRepository.findOne({ where: { id: placeId } });
        const label = await this.labelRepository.findOne({ where: { id: labelId } });
        if (!place || !label) {
            throw new NotFoundException('el lugar o la etiqueta no fueron encontrados, verifica los datos');
        }

        const labelPlace = this.labelPlaceRepository.create({ place, label });
        return this.labelPlaceRepository.save(labelPlace);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error inesperado al asociar la etiqueta al lugar');
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
            changes: { category: 'Place' },
            reason
        });
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error inesperado al guardar los cambios');
        }
    }
}
