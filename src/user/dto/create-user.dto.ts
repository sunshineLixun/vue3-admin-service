import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  readonly username: string;

  @IsString()
  @ApiProperty()
  readonly password: string;
}
