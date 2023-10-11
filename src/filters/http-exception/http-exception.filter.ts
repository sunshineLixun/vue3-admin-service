import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

// 只针对Http请求错误异常处理
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let resultMessage = exception.message;
    let resultCode = 1;
    try {
      const { code, message } = JSON.parse(exception.message);
      resultMessage = message;
      resultCode = code;
    } catch (e) {}
    const errorResponse = {
      status,
      message: resultMessage,
      code: resultCode, // 自定义code
    };
    // 设置返回的状态码、请求头、发送错误信息

    // 修改为链式
    response
      .status(status)
      .header('Content-Type', 'application/json; charset=utf-8')
      .json(errorResponse);
  }
}
