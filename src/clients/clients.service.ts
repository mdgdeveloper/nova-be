import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    try {
      return await this.prisma.client.create({
        data: createClientDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const target =
            error.meta && error.meta.target
              ? (error.meta.target as string[]).join(', ')
              : 'field';
          throw new ConflictException(
            `Un cliente con el campo ${target} ya existe`,
          );
        }
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async findAll() {
    return await this.prisma.client.findMany();
  }

  async findOne(id: number) {
    const client = await this.prisma.client.findUnique({
      where: { client_id: id },
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      const client = await this.prisma.client.update({
        where: { client_id: id },
        data: updateClientDto,
      });
      return client;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Client not found');
        }
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async remove(id: number) {
    try {
      const client = await this.prisma.client.delete({
        where: { client_id: id },
      });
      return client;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Client not found');
        }
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
