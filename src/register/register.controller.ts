import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('注册')
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @ApiOperation({ summary: '注册' })
  async register(@Body() createRegisterDto: CreateRegisterDto) {
    const result = await this.registerService.register(createRegisterDto);
    if (result.SQLError) {
      throw new HttpException(result.message, 500);
    }
    return result.message;
  }
}
