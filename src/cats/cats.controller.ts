import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@ApiTags('默认')
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @ApiOperation({ summary: '创建' })
  async create(@Body() createCatDto: CreateCatDto) {
    return await this.catsService.create(createCatDto);
  }

  @Get()
  @ApiOperation({ summary: '列表' })
  async findAll(): Promise<CreateCatDto[]> {
    return await this.catsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '详情' })
  async detail(@Param('id', new ParseIntPipe()) id: number) {
    return await this.catsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新' })
  async update(@Param('id') id: number, @Body() body: CreateCatDto) {
    return await this.catsService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除' })
  async remove(@Param('id') id: number) {
    return await this.catsService.remove(id);
  }
}
