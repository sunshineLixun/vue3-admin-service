import { Injectable } from '@nestjs/common';
import { Register } from 'src/register/entities/register.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(private jwtService: JwtService) {}

  async login(user: Partial<Register>) {
    const payload = { username: user.username, id: user.id };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      type: 'Bearer',
    };
  }
}
