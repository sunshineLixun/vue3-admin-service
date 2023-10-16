import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Register } from 'src/register/entities/register.entity';
import { LocalStrategy } from 'src/global/strategy/local.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Register])],
  controllers: [LoginController],
  providers: [LocalStrategy, LoginService],
})
export class LoginModule {}
