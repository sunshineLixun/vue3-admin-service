import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        console.log('DB_HOST', configService.get<string>('DB_HOST'));
        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST') ?? 'localhost',
          port: configService.get<number>('DB_PORT') ?? 3306,
          username: configService.get<string>('DB_USERNAME') ?? 'root',
          password: configService.get<string>('DB_PASSWORD') ?? '123456789',
          database: configService.get<string>('DB_DATABASE') ?? 'posts',
          retryDelay: 500,
          retryAttempts: 10,
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),
  ],
})
export class CommonTypeOrmModule {}
