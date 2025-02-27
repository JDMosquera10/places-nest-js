import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/**
 * Suite de pruebas para el controlador AppController.
 */
describe('AppController', () => {
  let appController: AppController;

  /**
   * Configuración inicial antes de cada prueba.
   */
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  /**
   * Pruebas para el método root del controlador.
   */
  describe('root', () => {
    /**
     * Prueba para verificar que el método getHello retorna "Hello World!".
     */
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
