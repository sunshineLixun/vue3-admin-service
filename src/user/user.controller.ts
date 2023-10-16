import {
  Controller,
  Post,
  Body,
  HttpException,
  Get,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/global/decorator/public.decorator';

@ApiTags('注册/用户')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.register(createUserDto);
    if (result.SQLError) {
      throw new HttpException(result.message, 500);
    }
    return result.message;
  }

  @Get('user:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOneById(id);
  }
}
