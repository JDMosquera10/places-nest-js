import { Test, TestingModule } from '@nestjs/testing';
import { MultimediasController } from './multimedia.controller';

/**
 * Suite de pruebas para el controlador MultimediasController.
 */
describe('MultimediasController', () => {
  let controller: MultimediasController;

  /**
   * Configuración inicial antes de cada prueba.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultimediasController],
    }).compile();

    controller = module.get<MultimediasController>(MultimediasController);
  });

  /**
   * Prueba para verificar que el controlador está definido.
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
