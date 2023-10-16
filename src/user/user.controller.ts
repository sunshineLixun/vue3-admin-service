import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('注册')
@Controller('register')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '注册' })
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.register(createUserDto);
    if (result.SQLError) {
      throw new HttpException(result.message, 500);
    }
    return result.message;
  }
}
