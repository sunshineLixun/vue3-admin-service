import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { StrategyOptions } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // 这里的 Strategy 必须是 passport-jwt 包中的
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    } as StrategyOptions);
  }

  async validate(payload: User) {
    const existUser = await this.userRepository.findOne({
      where: { id: payload.id },
    });

    if (!existUser) throw new UnauthorizedException('token验证失败');

    return existUser;
  }
}
