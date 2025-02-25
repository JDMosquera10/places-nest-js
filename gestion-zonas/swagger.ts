import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('API de Lugares')
  .setDescription('API para gestionar lugares de interés')
  .setVersion('1.0')
  .build();