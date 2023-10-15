import { Body, Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Register } from './entities/register.entity';
import { Repository } from 'typeorm';
import { isEmpty } from 'src/utils';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Register)
    private readonly reginstetRepository: Repository<Register>,
  ) {}

  async register(@Body() registerDto: CreateRegisterDto) {
    // 直接sava，BeforeInsert不会执行
    const entity = plainToInstance(Register, registerDto);
    const { id } = await this.reginstetRepository.save(entity);
    if (!isEmpty(id)) {
      return '注册成功';
    }
    return '注册失败';
  }
}
