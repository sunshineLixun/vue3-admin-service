import { Body, Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Register } from './entities/register.entity';
import { Repository } from 'typeorm';
import { isEmpty } from 'src/utils';
import { plainToInstance } from 'class-transformer';

interface FindOneResult {
  message?: string;
  isExist?: boolean;
  SQLError?: boolean;
}

interface RegisterResult {
  message?: string;
  SQLError?: boolean;
}

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Register)
    private readonly reginstetRepository: Repository<Register>,
  ) {}

  async register(
    @Body() registerDto: CreateRegisterDto,
  ): Promise<RegisterResult> {
    const { message, SQLError, isExist } = await this.findOne(
      registerDto.username,
    );

    if (SQLError) {
      return {
        message,
        SQLError,
      };
    }

    if (isExist) {
      return {
        message: '该用户已存在',
      };
    }

    // 直接sava，BeforeInsert不会执行
    const entity = plainToInstance(Register, registerDto);
    const { id } = await this.reginstetRepository.save(entity);
    if (!isEmpty(id)) {
      return {
        message: '注册成功',
      };
    }
    return {
      message: '注册失败',
    };
  }

  async findOne(username: string): Promise<FindOneResult> {
    // 这里用下原生SQL查询
    const sql = `SELECT username FROM register WHERE username = '${username}'`;
    let result: any[];
    try {
      result = await this.reginstetRepository.query(sql);
    } catch (error) {
      return {
        message: 'SQL语句查询错误',
        SQLError: true,
      };
    }
    return {
      isExist: result.length > 0,
    };
  }
}
