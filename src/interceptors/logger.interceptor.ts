import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// import {CatsService} from '../cats/cats.service'

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  // constructor(private cs: CatsService) {
  //   console.log(cs);
  // }
  // even though interceptor is not in any context module, it can see catsService
  // but for LoggerInterceptor injects some service or controller, it has to be imported or in the current module
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const now = Date.now();
    return (
      next
        .handle()
        // returns RxJS Observable
        .pipe(tap(() => console.log('After... ' + (Date.now() - now) + 'ms')))
    );
  }
}
