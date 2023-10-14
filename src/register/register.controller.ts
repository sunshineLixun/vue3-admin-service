import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('注册')
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @ApiOperation({ summary: '注册' })
  create(@Body() createRegisterDto: CreateRegisterDto) {
    return this.registerService.register(createRegisterDto);
  }
}
