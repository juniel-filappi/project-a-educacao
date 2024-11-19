import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  IStudentFilters,
  StudentRepository,
} from '@/student/student.repository';
import { CreateStudentDto } from '@/shared/dto/student/create-student.dto';
import { UserRepository } from '@/user/user.repository';
import { UpdateStudentDto } from '@/shared/dto/student/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getStudents(userId: number, filters: IStudentFilters) {
    return this.studentRepository.getAllWithFilters(userId, filters);
  }

  async getStudent(userId: number, id: number) {
    const student = await this.studentRepository.findById(userId, id);

    if (!student) {
      throw new NotFoundException('Estudante não encontrado');
    }

    return student;
  }

  async createStudent(userId: number, data: CreateStudentDto) {
    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const studentExists = await this.studentRepository.findByRa(
      userId,
      data.ra,
    );

    if (studentExists) {
      throw new BadRequestException('Estudante já cadastrado');
    }

    return this.studentRepository.create(userId, data);
  }

  async updateStudent(
    userId: number,
    studentId: number,
    data: UpdateStudentDto,
  ) {
    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const studentExists = await this.studentRepository.findById(
      userId,
      studentId,
    );

    if (!studentExists) {
      throw new NotFoundException('Estudante não encontrado');
    }

    return this.studentRepository.update(userId, studentId, data);
  }

  async deleteStudent(userId: number, id: number) {
    const studentExists = await this.studentRepository.findById(userId, id);

    if (!studentExists) {
      throw new NotFoundException('Estudante não encontrado');
    }

    return this.studentRepository.delete(userId, id);
  }
}
