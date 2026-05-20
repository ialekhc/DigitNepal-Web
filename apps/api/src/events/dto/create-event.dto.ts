import { EventStatus } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsDateString()
  eventDate!: string;

  @IsString()
  eventTime!: string;

  @IsOptional()
  @IsString()
  venue?: string;

  @IsOptional()
  @IsUrl()
  onlineLink?: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsUrl()
  registrationLink?: string;

  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;
}
