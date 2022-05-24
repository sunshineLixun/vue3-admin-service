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
  ): Observable<any> | Promise<Observable<SuccessResponse>> {
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
