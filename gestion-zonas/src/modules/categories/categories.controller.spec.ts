import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';

/**
 * Pruebas unitarias para el controlador de categorías.
 */
describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
    }).compile();
    
  /**
   * Verifica que el controlador esté definido.
   */
    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
