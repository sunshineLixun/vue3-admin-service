import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { LocalStrategy } from 'src/global/strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET') ?? 'secret',
    signOptions: {
      expiresIn: configService.get('JWT_EXPIRES_IN') ?? '10m',
    },
  }),
});

@Module({
  imports: [TypeOrmModule.forFeature([User]), jwtModule],
  controllers: [LoginController],
  providers: [LocalStrategy, LoginService],
  exports: [jwtModule],
})
export class LoginModule {}
