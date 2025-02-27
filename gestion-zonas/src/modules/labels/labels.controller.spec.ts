import { Test, TestingModule } from '@nestjs/testing';
import { LabelsController } from './labels.controller';

/**
 * Suite de pruebas para el controlador LabelsController.
 */
describe('LabelsController', () => {
  let controller: LabelsController;
  
   /**
   * Configuración inicial antes de cada prueba.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabelsController],
    }).compile();

    controller = module.get<LabelsController>(LabelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
