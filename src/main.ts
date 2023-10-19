import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置全局路由前缀
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest api')
    .setDescription('第一个nest应用')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.enableCors();

  const configService = app.get(ConfigService); // 获取全局配置
  const PORT = configService.get<number>('PORT') || 9000;
  const HOST = configService.get('HOST') || 'localhost';

  await app.listen(PORT, () => {
    console.log(`服务已经启动,接口请访问:http://wwww.${HOST}:${PORT}`);
  });
}
bootstrap();
