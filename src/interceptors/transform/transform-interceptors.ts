import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { instanceToPlain } from 'class-transformer';

interface SuccessResponse {
  result: {
    data: Record<string, any>;
  };
  code: number;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<SuccessResponse> | Promise<Observable<SuccessResponse>> {
    // 成功response 拼装
    return next.handle().pipe(
      map((data) => {
        return {
          result: {
            data: instanceToPlain(data),
          },
          code: 0,
        };
      }),
    );
  }
}
