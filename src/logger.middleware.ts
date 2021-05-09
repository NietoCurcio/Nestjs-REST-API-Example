import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log('Request...');
//     next();
//   }
// }
// use function middleware since it does not need any dependency
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request...');
  next();
}
