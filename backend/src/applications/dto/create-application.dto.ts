import { ProjectCategory } from '@prisma/client';
import { IsArray, IsBoolean, IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsEnum(ProjectCategory)
  category!: ProjectCategory;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsString()
  description!: string;

  @IsArray()
  @IsString({ each: true })
  technologies!: string[];

  @IsOptional()
  @IsUrl()
  projectLink?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}
