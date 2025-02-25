import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionAnswerDto {
  @ApiProperty({ example: 1, description: 'ID del lugar' })
  placeId: number;

  @ApiProperty({ example: '¿que tal es el lugar?', description: 'pregunta realizada' })
  question: string;

  @ApiProperty({ example: { answer: "el lugar esta melo", createAt: new Date() }, description: 'Comentario del usuario' })
  answers: { answer: string; createdAt: Date }[];;
}
