import { Body, Injectable } from '@nestjs/common';
import { CreateRegisterDto } from 'src/register/dto/create-register.dto';
import { Repository } from 'typeorm';
import { Register } from 'src/register/entities/register.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Register) private loginRepository: Repository<Register>,
  ) {}

  async login(@Body() dto: CreateRegisterDto) {
    console.log(dto);
    return 'This action adds a new login';
  }
}
