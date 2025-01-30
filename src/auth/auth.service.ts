import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  async findOne(body: { pin: number }) {
    const employee = await this.prisma.employee.findUnique({
      where: { pin: body.pin },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found!');
    }
    return employee;
  }
}
