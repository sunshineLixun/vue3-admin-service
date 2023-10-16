import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Register } from 'src/register/entities/register.entity';
import { LocalStrategy } from 'src/global/strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';

const jwtModule = JwtModule.register({
  secret: 'secret',
  signOptions: { expiresIn: '4h' },
});

@Module({
  imports: [TypeOrmModule.forFeature([Register]), jwtModule],
  controllers: [LoginController],
  providers: [LocalStrategy, LoginService],
  exports: [jwtModule],
})
export class LoginModule {}
