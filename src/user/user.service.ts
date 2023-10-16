import { Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
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
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(@Body() registerDto: CreateUserDto): Promise<RegisterResult> {
    const { message, SQLError, isExist } = await this.findOneByUserName(
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
    const entity = plainToInstance(User, registerDto);
    const { id } = await this.userRepository.save(entity);
    if (!isEmpty(id)) {
      return {
        message: '注册成功',
      };
    }
    return {
      message: '注册失败',
    };
  }

  async findOneByUserName(username: string): Promise<FindOneResult> {
    // 这里用下原生SQL查询
    const sql = `SELECT username FROM user WHERE username = '${username}'`;
    let result: any[];
    try {
      result = await this.userRepository.query(sql);
    } catch (error) {
      return {
        message: error.message,
        SQLError: true,
      };
    }

    return {
      isExist: result.length > 0,
    };
  }

  async findOneById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }
}
