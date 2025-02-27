import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateChangeHistoryDto } from './changeHistory.dto';

export class UpdateChangeHistoryDto extends PartialType(CreateChangeHistoryDto) {}