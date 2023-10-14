import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiTags('登录')
  @Post()
  @ApiOperation({ summary: '登录' })
  async create(@Body() createLoginDto: CreateLoginDto) {
    return await this.loginService.create(createLoginDto);
  }
}
