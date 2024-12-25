import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}
  async create(createServiceDto: CreateServiceDto) {
    try {
      return await this.prisma.service.create({
        data: createServiceDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const target =
            error.meta && error.meta.target
              ? (error.meta.target as string[]).join(', ')
              : 'field';
          throw new ConflictException(
            `Un servicio con el campo ${target} ya existe`,
          );
        }
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async findAll() {
    return await this.prisma.service.findMany();
  }

  async findOne(id: number) {
    const service = await this.prisma.service.findUnique({
      where: { service_id: id },
    });
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    return service;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    try {
      const service = await this.prisma.service.update({
        where: { service_id: id },
        data: updateServiceDto,
      });
      return service;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Service not found');
        }
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.service.delete({
        where: { service_id: id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Service not found');
        }
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
