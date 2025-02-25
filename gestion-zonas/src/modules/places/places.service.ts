import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from './entities/place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Label } from '../labels/entities/label.entity';
import { LabelPlace } from './entities/label-place';
import { Category } from '../categories/entities/category.entity';

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
        private readonly categoryRepository: Repository<Category>
    ) { }

    /**
    * metodo encargado de crear los lugares 
    * @param createPlaceDto 
    * @returns {Place}
    */
    async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
        const category = await this.categoryRepository.findOne({ where: { id: createPlaceDto.category_id } });

        if (!category) {
            throw new Error('Category not found');
        }

        const newPlace = this.placeRepository.create({
            ...createPlaceDto,
            category_id: category,
        });

        return await this.placeRepository.save(newPlace);
    }

    /**
* metodo encargado de retornar todos los lugares
* @returns {Place[]}
*/
    async findAll(): Promise<Place[]> {
        return await this.placeRepository.find();
    }

    /**
  * metodo encargado de retornar un lugar por id 
  * @param id 
  * @returns {Place}
  */
    async findOne(id: number): Promise<Place> {
        const place = await this.placeRepository.findOne({ where: { id } });
        if (!place) {
            throw new NotFoundException(`El lugar con ID ${id} no existe`);
        }
        return place;
    }

    /**
    * metodo encargado de actualizar un lugar
    * @param id 
    * @param UpdatePlaceDto 
    * @returns {Place}
    */
    async update(id: number, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
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
    }

    /**
     * metodo encargado de eliminar un lugar
     * @param id 
     */
    async remove(id: number): Promise<void> {
        const place = await this.findOne(id);
        await this.placeRepository.remove(place);
    }

    /**
    * metodo encargado de asociar o agregarle una etiqueta a un lugar
    * @param placeId 
    * @param labelId 
    */
    async addLabelToPlace(placeId: number, labelId: number) {
        const place = await this.placeRepository.findOne({ where: { id: placeId } });
        const label = await this.labelRepository.findOne({ where: { id: labelId } });
        if (!place || !label) {
            throw new NotFoundException('el lugar o la etiqueta no fueron encontrados, verifica los datos');
        }

        const labelPlace = this.labelPlaceRepository.create({ place, label });
        return this.labelPlaceRepository.save(labelPlace);
    }
}
