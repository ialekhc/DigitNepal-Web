import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateInquiryDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsString()
  message!: string;
}
