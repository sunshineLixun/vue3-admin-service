import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiTags('登录')
  @Post('login')
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  // 当时用Req注解时，没有显示申明Dto参数，swagger不显示接口入参
  // 解决swagger不显示请求参数问题
  @ApiBody({ type: CreateUserDto })
  async login(@Req() req: Request) {
    // 这里的user是 LocalStrategy 中 validate方法返回的结果
    return this.loginService.login(req.user);
  }
}
