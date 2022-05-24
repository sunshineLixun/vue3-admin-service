import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsInt()
  @ApiProperty()
  readonly age: number;
}
