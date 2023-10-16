import { PassportStrategy } from '@nestjs/passport';
import { Strategy, type IStrategyOptions } from 'passport-local';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compareSync } from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { Register } from 'src/register/entities/register.entity';

// 校验策略

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Register)
    private readonly reginstetRepository: Repository<Register>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.reginstetRepository.findOneBy({
      username,
    });

    if (!user) {
      throw new BadRequestException('用户不存在');
    }

    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码错误');
    }

    return user;
  }
}
