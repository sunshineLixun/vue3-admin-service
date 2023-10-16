import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { CreateRegisterDto } from 'src/register/dto/create-register.dto';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiTags('登录')
  @Post('login')
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  // 解决swagger不显示请求参数问题
  @ApiBody({ type: CreateRegisterDto })
  async login(@Req() req: Request) {
    // 这里的user是 LocalStrategy 中 validate方法返回的结果
    return this.loginService.login(req.user);
  }
}
