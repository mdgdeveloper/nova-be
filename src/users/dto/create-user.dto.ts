import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password_hash: string;

  @IsOptional()
  @IsInt()
  role_id?: number;
}
