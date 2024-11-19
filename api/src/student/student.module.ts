import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { UserModule } from '@/user/user.module';
import { StudentRepository } from '@/student/student.repository';

@Module({
  imports: [PrismaModule, UserModule],
  providers: [StudentService, StudentRepository],
  controllers: [StudentController],
})
export class StudentModule {}
