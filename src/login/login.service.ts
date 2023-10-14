import { Body, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { Repository } from 'typeorm';
import { Login } from './entities/login.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login) private loginRepository: Repository<Login>,
  ) {}

  async create(@Body() createLoginDto: CreateLoginDto) {
    console.log(createLoginDto);
    return 'This action adds a new login';
  }
}
