import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransformInterceptor } from './interceptors/transform/transform-interceptors';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { ValidationPipe } from './pipe/validate.pipe';
import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module';
import { JwtAuthGuard } from './global/guard/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'posts',
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CatsModule,
    UserModule,
    LoginModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
