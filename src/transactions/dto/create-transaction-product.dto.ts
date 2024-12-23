import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateTransactionProductDto {
  @IsInt()
  transaction_id: number;

  @IsInt()
  product_id: number;

  @IsInt()
  quantity: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;
}
