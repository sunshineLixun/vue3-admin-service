import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(private jwtService: JwtService) {}

  async login(user: Partial<User>) {
    const payload = { username: user.username, id: user.id };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      type: 'Bearer',
      message: '登录成功',
    };
  }
}
