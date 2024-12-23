import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateTransactionServiceDto {
  @IsInt()
  transaction_id: number;

  @IsInt()
  service_id: number;

  @IsInt()
  quantity: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;
}
