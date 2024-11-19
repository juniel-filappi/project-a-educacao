import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Env } from '@/env';
import { PrismaModule } from '@/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '@/auth/jwt.strategy';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(configService: ConfigService<Env>) {
        return {
          secret: configService.get('JWT_SECRET', { infer: true }),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRATION_TIME', {
              infer: true,
            }),
          },
        };
      },
    }),
    UserModule,
    PrismaModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
