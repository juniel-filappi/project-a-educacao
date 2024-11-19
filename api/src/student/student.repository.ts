import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from '@/shared/dto/student/create-student.dto';
import { UpdateStudentDto } from '@/shared/dto/student/update-student.dto';
import { clearCpf } from '@/helpers';

export interface IStudentFilters {
  name?: string;
  email?: string;
  cpf?: string;
  ra?: string;
  order?: string;
  sort?: string;
}

@Injectable()
export class StudentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllWithFilters(userId: number, filters: IStudentFilters) {
    return this.prisma.student.findMany({
      where: {
        userId,
        name: {
          contains: filters?.name,
        },
        email: {
          contains: filters?.email,
        },
        cpf: {
          contains: filters?.cpf,
        },
        ra: {
          contains: filters?.ra,
        },
      },
      orderBy: {
        [filters?.sort || 'id']: filters?.order || 'asc',
      },
    });
  }

  async findById(userId: number, id: number) {
    return this.prisma.student.findUnique({ where: { id, userId } });
  }

  async findByRa(userId: number, ra: string) {
    return this.prisma.student.findUnique({ where: { ra, userId } });
  }

  async create(userId: number, data: CreateStudentDto) {
    const dataCreate = {
      name: data.name,
      email: data.email,
      ra: data.ra,
      cpf: clearCpf(data.cpf),
      userId: userId,
    };

    return this.prisma.student.create({ data: dataCreate });
  }

  async update(userId: number, studentId: number, data: UpdateStudentDto) {
    const dataCreate = {
      name: data.name,
      email: data.email,
    };

    return this.prisma.student.update({
      where: { id: studentId, userId },
      data: dataCreate,
    });
  }

  async delete(userId: number, id: number) {
    return this.prisma.student.delete({ where: { id, userId } });
  }
}
