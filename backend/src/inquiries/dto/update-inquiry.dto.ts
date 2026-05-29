import { IsOptional, IsString } from 'class-validator';

export class UpdateInquiryDto {
  @IsOptional()
  @IsString()
  status?: string;
}
