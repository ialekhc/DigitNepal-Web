import { IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateSettingDto {
  @IsObject()
  value!: Record<string, unknown>;

  @IsOptional()
  @IsString()
  description?: string;
}
