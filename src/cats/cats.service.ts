import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private usersRepository: Repository<Cat>,
  ) {}

  async create(@Body() catDto: CreateCatDto) {
    const { id } = await this.usersRepository.save(catDto);
    if (id) {
      return '创建成功';
    } else {
      return '创建失败';
    }
  }

  async findAll(): Promise<Cat[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<Cat> {
    return await this.usersRepository.findOne(id);
  }

  async update(id: number, body: CreateCatDto) {
    const entity = await this.usersRepository.findByIds([id]);
    if (entity.length == 0) {
      return 'id错误';
    }
    const { raw } = await this.usersRepository.update(id, body);
    console.log(raw);
    if (raw) {
      return '修改成功';
    } else {
      return '修改失败';
    }
  }

  async remove(id: number) {
    const cat = await this.findOne(id);
    if (cat) {
      const { affected } = await this.usersRepository.delete(id);
      if (affected && affected > 0) {
        return '删除成功';
      } else {
        return '删除失败';
      }
    } else {
      return '小猫不存在';
    }
  }
}
