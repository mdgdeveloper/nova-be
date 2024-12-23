import { PaymentMethod } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsDateString,
  IsDecimal,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { CreateTransactionProductDto } from './create-transaction-product.dto';
import { CreateTransactionServiceDto } from './create-transaction-service.dto';

export class CreateTransactionDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  client_id: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  employee_id: number;

  @IsNotEmpty()
  @IsDecimal()
  @IsPositive()
  total_amount: number;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  // This is optional just in case we want to specify the transaction time
  @IsOptional()
  @IsDateString()
  transaction_time?: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTransactionProductDto)
  @ArrayNotEmpty()
  transaction_products?: CreateTransactionProductDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTransactionServiceDto)
  @ArrayNotEmpty()
  transaction_services?: CreateTransactionServiceDto[];
}
