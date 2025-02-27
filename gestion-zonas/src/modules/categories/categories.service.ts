import { Injectable, NotFoundException } from '@nestjs/common';
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
        const newCategory = this.categoryRepository.create(createCategoryDto);
        await this.changesSave('creación de categoria');
        return await this.categoryRepository.save(newCategory);
    }

    /**
    * metodo encargado de retornar todas las categorias
    * @returns {Category[]}
    */
    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    /**
    * metodo encargado de retornar una categoria por id 
    * @param id 
    * @returns {Category}
    */
    async findOne(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new NotFoundException(`La cateogria con ID ${id} no existe`);
        }
        return category;
    }

    /**
      * metodo encargado de actualizar una categoria
      * @param id 
      * @param createCategoryDto 
      * @returns {Category}
      */
    async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        const category = await this.findOne(id);
        if (!category) {
            throw new NotFoundException(`La cateogria con ID ${id} no existe`);
        }
        await this.changesSave('actualización de categoria');

        const updatedCategory = Object.assign(category, updateCategoryDto);
        return await this.categoryRepository.save(updatedCategory);
    }

    /**
     * metodo encargado de eliminar una categoria
     * @param id 
     */
    async remove(id: number): Promise<void> {
        const category = await this.findOne(id);
        if (!category) {
            throw new NotFoundException(`La cateogria con ID ${id} no existe`);
        }
        await this.changesSave('eliminación de categoria');
        await this.categoryRepository.remove(category);
    }

    /**
   * guarda los cambios en la base de datos implementando el servicio de changeHistory
   * @param reason 
   * @returns 
   */
    changesSave(reason: string) {
        return this.changeHistoryService.create({
            placeId: 1,
            changes: { category: 'category' },
            reason
        });
    }
}
