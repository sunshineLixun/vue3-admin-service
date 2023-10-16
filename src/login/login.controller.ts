import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateRegisterDto } from 'src/register/dto/create-register.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiTags('登录')
  @Post('login')
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  async login(@Body() createLoginDto: CreateRegisterDto) {
    return await this.loginService.login(createLoginDto);
  }
}
