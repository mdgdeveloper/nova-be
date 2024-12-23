import { IsString, IsOptional, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateClientDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsOptional()
  @IsPhoneNumber(null) // Ensures the value is a valid phone number
  phone_number?: string;

  @IsOptional()
  @IsEmail() // Ensures the value is a valid email address
  email?: string;
}
