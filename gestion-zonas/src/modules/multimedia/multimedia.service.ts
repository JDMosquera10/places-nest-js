import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Multimedia } from './entities/multimedia.entity';
import { CreateMultimediaDto } from './dto/create-multimedia.dto';
import { UpdateMultimediaDto } from './dto/update-multimedia.dto';
import { Place } from '../places/entities/place.entity';
import { ChangeHistoryService } from '../changeHistory/changeHistory.service';

@Injectable()
export class MultimediasService {
    constructor(
        @InjectRepository(Multimedia)
        private readonly multimediaRepository: Repository<Multimedia>,
        @InjectRepository(Place)
        private readonly placeRepository: Repository<Place>,
        private readonly changeHistoryService: ChangeHistoryService
    ) { }

    /**
     * metodo encargado de crear las multimedias 
     * @param createCategoryDto 
     * @returns {Multimedia}
     */
    async create(createMultimediaDto: CreateMultimediaDto): Promise<Multimedia> {
        const place = await this.placeRepository.findOne({ where: { id: createMultimediaDto.place_id } });

        if (!place) {
            throw new NotFoundException(`El lugar que estas buscando no existe`);
        }


        const newMultimedia = this.multimediaRepository.create({
            ...createMultimediaDto,
            place_id: place,
        });

        await this.changesSave('creación de la multimedia');

        return await this.multimediaRepository.save(newMultimedia);
    }

    /**
    * metodo encargado de retornar todas las multimedia
    * @returns {Multimedia[]}
    */
    async findAll(): Promise<Multimedia[]> {
        return await this.multimediaRepository.find();
    }

    /**
   * metodo encargado de retornar una multimedia por id 
   * @param id 
   * @returns {Multimedia}
   */
    async findOne(id: number): Promise<Multimedia> {
        const multimedia = await this.multimediaRepository.findOne({ where: { id } });
        if (!multimedia) {
            throw new NotFoundException(`La multimedia con ID ${id} no existe`);
        }
        return multimedia;
    }

    /**
     * metodo encargado de actualizar una multimedia
     * @param id 
     * @param createCategoryDto 
     * @returns {Multimedia}
     */
    async update(id: number, updateMultimediaDto: UpdateMultimediaDto): Promise<Multimedia> {
        const multimedia = await this.findOne(id);
        // buscar el lugar
        const place = await this.placeRepository.findOne({ where: { id: updateMultimediaDto.place_id } });
        if (!multimedia) {
            throw new NotFoundException(`La multimedia con ID ${id} no existe`);
        }

        if (!place) {
            throw new Error('place not found');
        }
        const updatedMultimedia = Object.assign(multimedia, updateMultimediaDto);
        await this.changesSave('actualización de multimedia');

        return await this.multimediaRepository.save(updatedMultimedia);
    }

    /**
     * metodo encargado de eliminar una multimedia
     * @param id 
     */
    async remove(id: number): Promise<void> {
        const multimedia = await this.findOne(id);
        if (!multimedia) {
            throw new NotFoundException(`La multimedia con ID ${id} no existe`);
        }
        await this.changesSave('eliminación de multimedia');
        await this.multimediaRepository.remove(multimedia);
    }

    /**
    * guarda los cambios en la base de datos implementando el servicio de changeHistory
    * @param reason 
    * @returns 
    */
    changesSave(reason: string) {
        return this.changeHistoryService.create({
            placeId: 1,
            changes: { category: 'Place' },
            reason
        });
    }
}
