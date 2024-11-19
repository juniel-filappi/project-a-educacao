import { HttpStatus, INestApplication } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcryptjs';

describe('StudentController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let accessToken: string;
  let userId: number;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);

    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await hash('123456', 8),
      },
    });
    accessToken = jwt.sign({ sub: user.id });
    userId = user.id;

    await app.init();
  });

  it('should be able to create student', async () => {
    const response = await request(app.getHttpServer())
      .post('/students')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        cpf: '12345678900',
        ra: '123456',
      });

    expect(response.status).toBe(HttpStatus.CREATED);

    const studentOnDatabase = await prisma.student.findFirst({
      where: { ra: '123456' },
    });

    expect(studentOnDatabase).toBeTruthy();
  });

  it('should be able to list students', async () => {
    const response = await request(app.getHttpServer())
      .get('/students')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toEqual([
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        email: expect.any(String),
        cpf: expect.any(String),
        ra: expect.any(String),
      }),
    ]);
  });

  it('should be able to get student by id', async () => {
    const student = await prisma.student.create({
      data: {
        name: 'John Doe',
        email: 'teste@teste.com',
        cpf: '83248989234',
        ra: '138283',
        userId: userId,
      },
    });

    const response = await request(app.getHttpServer())
      .get(`/students/${student.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: student.id,
        name: student.name,
        email: student.email,
        cpf: student.cpf,
        ra: student.ra,
      }),
    );
  });

  it('should be able to update student', async () => {
    const student = await prisma.student.create({
      data: {
        name: 'John Doe',
        email: 'wqwqei@wqeqw.com',
        cpf: '98492389243',
        ra: '098374',
        userId: userId,
      },
    });

    const response = await request(app.getHttpServer())
      .put(`/students/${student.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'John Doe Updated',
        email: 'wqwqei@wqeqw.com',
      });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: student.id,
        name: 'John Doe Updated',
        email: 'wqwqei@wqeqw.com',
        ra: student.ra,
        cpf: student.cpf,
      }),
    );
  });

  it('should be able to delete student', async () => {
    const student = await prisma.student.create({
      data: {
        name: 'John Doe',
        email: 'delete@wqeqw.com',
        cpf: '93849389434',
        ra: '9992992',
        userId: userId,
      },
    });

    const response = await request(app.getHttpServer())
      .delete(`/students/${student.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(HttpStatus.NO_CONTENT);
  });

  it('should not be able to create student with same ra', async () => {
    const response = await request(app.getHttpServer())
      .post('/students')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        cpf: '12345678900',
        ra: '123456',
      });

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it('should not be able to create student with invalid params', async () => {
    const response = await request(app.getHttpServer())
      .post('/students')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'John Doe',
      });

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body).toEqual({
      statusCode: 400,
      message: expect.any(Array),
      error: 'Bad Request',
    });
  });

  it('should not be able get student with invalid id', async () => {
    const response = await request(app.getHttpServer())
      .get('/students/9999')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });
});
