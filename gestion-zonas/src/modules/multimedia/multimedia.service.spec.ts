import { Test, TestingModule } from '@nestjs/testing';
import { MultimediasService } from './multimedia.service';

describe('MultimediasService', () => {
  let service: MultimediasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultimediasService],
    }).compile();

    service = module.get<MultimediasService>(MultimediasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
