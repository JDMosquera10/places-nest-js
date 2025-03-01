import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ChangeHistoryService } from '../changeHistory/changeHistory.service';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        private readonly changeHistoryService: ChangeHistoryService 
    ) { }

    /**
     * metodo encargado de crear las categorias 
     * @param createCategoryDto 
     * @returns {Category}
     */
    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        try {
        const newCategory = this.categoryRepository.create(createCategoryDto);
        return await this.categoryRepository.save(newCategory);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error inesperado en la creación de la categoría');
        }
    }

    /**
    * metodo encargado de retornar todas las categorias
    * @returns {Category[]}
    */
    async findAll(): Promise<Category[]> {
        try {
        return await this.categoryRepository.find();
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error inesperado al obtener las categorías');
        }
    }

    /**
    * metodo encargado de retornar una categoria por id 
    * @param id 
    * @returns {Category}
    */
    async findOne(id: number): Promise<Category> {
        try {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new NotFoundException(`La cateogria con ID ${id} no existe`);
        }
        return category;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error inesperado al obtener la categoría');
        }
    }

    /**
      * metodo encargado de actualizar una categoria
      * @param id 
      * @param createCategoryDto 
      * @returns {Category}
      */
    async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        try {
        const category = await this.findOne(id);
        if (!category) {
            throw new NotFoundException(`La cateogria con ID ${id} no existe`);
        }
        const updatedCategory = Object.assign(category, updateCategoryDto);
        return await this.categoryRepository.save(updatedCategory);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error inesperado al actualizar la categoría');
        }
    }

    /**
     * metodo encargado de eliminar una categoria
     * @param id 
     */
    async remove(id: number): Promise<void> {
        try {
        const category = await this.findOne(id);
        if (!category) {
            throw new NotFoundException(`La cateogria con ID ${id} no existe`);
        }
        await this.categoryRepository.remove(category);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error inesperado al eliminar la categoría');
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
            changes: { category: 'category' },
            reason
        });
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error inesperado al guardar los cambios');
        }
    }
}
