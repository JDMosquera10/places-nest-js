import { Test, TestingModule } from '@nestjs/testing';
import { PlacesController } from './places.controller';

/**
 * Suite de pruebas para el controlador PlacesController.
 */
describe('PlacesController', () => {
  let controller: PlacesController;

  /**
   * Configuración inicial antes de cada prueba.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacesController],
    }).compile();

    controller = module.get<PlacesController>(PlacesController);
  });

  /**
   * Prueba para verificar que el controlador está definido.
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
