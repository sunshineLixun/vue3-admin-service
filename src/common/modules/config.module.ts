import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envConfig from 'config/envConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),
  ],
})
export class CommonConfigModule {}
