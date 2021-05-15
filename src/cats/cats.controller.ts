import {
  Controller,
  Get,
  Post,
  HttpCode,
  Req,
  Res,
  Header,
  Redirect,
  Param,
  HostParam,
  Body,
  Query,
  Put,
  Delete,
  Inject,
  HttpException,
  HttpStatus,
  UseFilters,
  ForbiddenException,
  UseGuards,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';
import { create } from 'eslint/lib/rules/*';
import { Request, Response } from 'express';
import { Observable, of } from 'rxjs';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import {
  CreateCatDto,
  ListAllEntities,
  UpdateCatDto,
  UserEntity,
} from './dto/cat.dto';
import { AllExceptionsFilter, HttpExceptionFilter } from '../exceptionFilters';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { LoggerInterceptor } from '../interceptors/logger.interceptor';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { TimeoutInterceptor } from 'src/interceptors/timeout.interceptor';
import { User } from 'src/customDecorator/user.decorator';
import { Auth } from 'src/customDecorator/auth.decorator';
import { Role } from 'src/auth/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
// import { ConfigService } from 'src/dynamicModule/config.service';

export interface Connection {
  a: number;
  b: number;
  c: number;
}

@Auth(Role.User)
@UseInterceptors(LoggerInterceptor, TransformInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller('cats')
export class CatsController {
  // CatsService provider, that has an @Injectable decorator
  // was injected in catsController
  constructor(
    private catsService: CatsService, // @Inject('CONNECTION') con, // @Inject('CONFIG') private useFac, // @Inject('ASYNC_CONNECTION') asyncCon, // private config: ConfigService,
  ) {}

  @Get('error')
  findError() {
    try {
      throw '';
    } catch (error) {
      // unhandled expcetion
      throw new ForbiddenException({
        message: 'error message',
        status: 403,
      });
      // subclass of HttpException, trycatch is a handlded exception (when not throw again),
      // UseFilters is for unhandled, notice that there is already a default ExceptionLayer
    }
  }

  @Get(':id')
  findOne(@Param() params, @User() user: UserEntity): string {
    console.log(user);
    return `This action returns a #${params.id} cat`;
  }

  @Get()
  async findAll(@Req() req: Request): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Post()
  // @UseFilters(AllExceptionsFilter) decorator already in controller-context
  @Roles(Role.Admin)
  async create(@Body() createCatDto: CreateCatDto, @Req() req: Request) {
    return this.catsService.create(createCatDto, req.user);
  }

  @Put(':id')
  @Auth(Role.Admin)
  // notice that the request flow is: middlewares -> guards -> pipe or interceptor -> handler(controller)
  @UseInterceptors(TimeoutInterceptor)
  update(@Param() params, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${params.id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }

  //   testing endpoints
  //   @Get('ab*cd')
  //   findAllWildCard() {
  //     return 'Wild card';
  //   }

  //   @Get('redirect')
  //   @Redirect('https://nestjs.com', 301)
  //   redirect() {}

  //   @Get('override')
  //   @Redirect('https://nestjs.com', 301)
  //   redirectOverride() {
  //     return { url: 'https://nestjs.com', status: 302 };
  //   }

  //   @Get('hostparam')
  //   getInfo(@HostParam('account') account: string) {
  //     return account;
  //   }

  //   @Get('async-method-returns-a-promise')
  //   async findAllPromise(): Promise<any[]> {
  //     return [{ promise: 'full' }];
  //   }

  //   @Get('observable')
  //   findAllObservable(): Observable<any[]> {
  //     return of([{ observale: 'subscribe?' }]);
  //   }

  //   @Post()
  //   @Header('Content-Type', 'text/plain')
  //   create(): object {
  //   returns plain text
  //     return { newCat: 'New cat' };
  //   }

  //   @Get()
  //   //   @HttpCode(304)
  //   findAll(
  //     @Req() request: Request,
  //     @Query() query: ListAllEntities,
  //   ): Array<object> {
  //     // console.log(request.headers);
  //     return [
  //       { _id: 0, name: 'milly' },
  //       { _id: 0, name: 'molly' },
  //     ];
  //   }

  //   library specfic below(using req, res), we can use res.header, res.cookies as well for example
  //   it should be used with care, avoid platform-dependency and issues on testing,
  //   and standard response handling (@Res({ passthrough: true }) res: Response, to fix the last one,
  //   you can set headers, cookies and leave rest with nest
  //   @Get('fofinhos')
  //   findAllFofinhos(@Res() res: Response) {
  //     res.status(401).send('fofinhos');
  //   }
}

// 'Controllers' should handle HTTP requests and delegate more complex tasks to 'providers' (a class in a module)
// organizes dependencies in OO way, it is recommended use SOLID
