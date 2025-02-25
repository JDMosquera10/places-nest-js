import { ApiProperty } from '@nestjs/swagger';

export class ResponseQuestionDto {
    @ApiProperty({ example: "67be0f69e13c806b8c916612", description: 'ID de la pregunta' })
    questionId: string;

    @ApiProperty({ example: 'el lugar es mu bueno y muy bonito', description: 'respuesta realizada a una pregunta que se le hace a un lugar' })
    respone: string;
}
