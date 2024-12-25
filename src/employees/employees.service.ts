import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      return await this.prisma.employee.create({
        data: createEmployeeDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const target =
            error.meta && error.meta.target
              ? (error.meta.target as string[]).join(', ')
              : 'field';
          throw new ConflictException(
            `Un empleado con el campo ${target} ya existe`,
          );
        }
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async findAll() {
    return await this.prisma.employee.findMany();
  }

  async findOne(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { employee_id: id },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const employee = await this.prisma.employee.update({
        where: { employee_id: id },
        data: updateEmployeeDto,
      });
      return employee;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        // Record not found
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }
      // Handle other potential errors
      throw new InternalServerErrorException(
        'An error occurred while updating the employee',
      );
    }
  }

  async remove(id: number) {
    try {
      const employee = await this.prisma.employee.delete({
        where: { employee_id: id },
      });
      return employee;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        // Record not found
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }
      // Handle other potential errors
      throw new InternalServerErrorException(
        'An error occurred while deleting the employee',
      );
    }
  }
}
