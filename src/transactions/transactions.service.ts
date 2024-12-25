import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const {
      client_id,
      employee_id,
      total_amount,
      payment_method,
      transaction_time,
      transaction_products,
      transaction_services,
    } = createTransactionDto;

    try {
      const transaction = await this.prisma.transaction.create({
        data: {
          client_id: client_id,
          employee_id: employee_id,
          total_amount: total_amount,
          payment_method: payment_method,
          transaction_time: transaction_time,
          TransactionProducts: transaction_products
            ? {
                create: transaction_products.map((product) => ({
                  product_id: product.product_id,
                  quantity: product.quantity,
                  price: product.price,
                })),
              }
            : undefined,
          TransactionServices: transaction_services
            ? {
                create: transaction_services.map((service) => ({
                  service_id: service.service_id,
                  quantity: service.quantity,
                })),
              }
            : undefined,
        },
        include: {
          Client: true,
          Employee: true,
          TransactionProducts: {
            include: {
              Product: true,
            },
          },
          TransactionServices: {
            include: {
              Service: true,
            },
          },
        },
      });

      return transaction;
    } catch (error) {
      throw new BadRequestException(
        'Failed to create transaction: ' + error.message,
      );
    }
  }

  async findAll() {
    const transactions = await this.prisma.transaction.findMany({
      include: {
        Client: true,
        Employee: true,
        TransactionProducts: {
          include: {
            Product: true,
          },
        },
        TransactionServices: {
          include: {
            Service: true,
          },
        },
      },
    });

    return transactions;
  }

  async findOne(id: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        transaction_id: id,
      },
      include: {
        Client: true,
        Employee: true,
        TransactionProducts: {
          include: {
            Product: true,
          },
        },
        TransactionServices: {
          include: {
            Service: true,
          },
        },
      },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }

    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const {
      client_id,
      employee_id,
      total_amount,
      payment_method,
      transaction_time,
      transaction_products,
      transaction_services,
    } = updateTransactionDto;

    try {
      const transaction = await this.prisma.transaction.update({
        where: {
          transaction_id: id,
        },
        data: {
          client_id: client_id,
          employee_id: employee_id,
          total_amount: total_amount,
          payment_method: payment_method,
          transaction_time: transaction_time,
          TransactionProducts: transaction_products
            ? {
                create: transaction_products.map((product) => ({
                  product_id: product.product_id,
                  quantity: product.quantity,
                  price: product.price,
                })),
              }
            : undefined,
          TransactionServices: transaction_services
            ? {
                create: transaction_services.map((service) => ({
                  service_id: service.service_id,
                  quantity: service.quantity,
                })),
              }
            : undefined,
        },
        include: {
          Client: true,
          Employee: true,
          TransactionProducts: {
            include: {
              Product: true,
            },
          },
          TransactionServices: {
            include: {
              Service: true,
            },
          },
        },
      });

      return transaction;
    } catch (error) {
      throw new BadRequestException(
        'Failed to update transaction: ' + error.message,
      );
    }
  }

  async remove(id: number) {
    try {
      const transaction = await this.prisma.transaction.delete({
        where: {
          transaction_id: id,
        },
      });

      return transaction;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Transaction with id ${id} not found`);
      }
      throw new BadRequestException(
        'Failed to delete transaction: ' + error.message,
      );
    }
  }
}
