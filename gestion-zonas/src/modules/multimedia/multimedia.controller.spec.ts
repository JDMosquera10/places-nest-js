import { Test, TestingModule } from '@nestjs/testing';
import { MultimediasController } from './multimedia.controller';

describe('MultimediasController', () => {
  let controller: MultimediasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultimediasController],
    }).compile();

    controller = module.get<MultimediasController>(MultimediasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
