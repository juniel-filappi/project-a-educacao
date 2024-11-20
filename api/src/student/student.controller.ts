import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from '@/student/student.service';
import { CurrentUser } from '@/shared/decorator/current-user.decorator';
import { UserPayload } from '@/auth/jwt.strategy';
import { CreateStudentDto } from '@/shared/dto/student/create-student.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { UpdateStudentDto } from '@/shared/dto/student/update-student.dto';

@Controller('students')
@UseGuards(JwtAuthGuard)
export class StudentController {
  constructor(private readonly service: StudentService) {}

  @Get('')
  async getStudents(
    @CurrentUser() user: UserPayload,
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('ra') ra: string,
    @Query('cpf') cpf: string,
    @Query('order') order: string,
    @Query('sort') sort: string,
  ) {
    return this.service.getStudents(user.sub, {
      name,
      order,
      sort,
      email,
      ra,
      cpf,
    });
  }

  @Get('/:id')
  async getStudent(@CurrentUser() user: UserPayload, @Param('id') id: string) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Invalid ID');
    }

    return this.service.getStudent(user.sub, Number(id));
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createStudent(
    @CurrentUser() user: UserPayload,
    @Body() data: CreateStudentDto,
  ) {
    return this.service.createStudent(user.sub, data);
  }

  @Put('/:id')
  async updateStudent(
    @CurrentUser() user: UserPayload,
    @Param('id') id: string,
    @Body() data: UpdateStudentDto,
  ) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Invalid ID');
    }

    return this.service.updateStudent(user.sub, Number(id), data);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteStudent(
    @CurrentUser() user: UserPayload,
    @Param('id') id: string,
  ) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Invalid ID');
    }

    return this.service.deleteStudent(user.sub, Number(id));
  }
}
