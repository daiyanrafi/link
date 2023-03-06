import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './controllers/models/user.entity';

import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './services/jwt.strategy';
import { JwtGuard } from './services/jwt.guard';
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '600000s' },
      })
    }),
      TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [AuthService, JwtStrategy, JwtGuard],
  controllers: [AuthController]
})
export class AuthModule {}
