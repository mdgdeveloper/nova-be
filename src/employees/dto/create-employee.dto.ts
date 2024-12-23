import { IsString, IsOptional, IsEmail, IsPhoneNumber } from 'class-validator';
export class CreateEmployeeDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsOptional()
  @IsPhoneNumber()
  phone_number: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
