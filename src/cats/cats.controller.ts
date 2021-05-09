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
} from '@nestjs/common';
import { create } from 'eslint/lib/rules/*';
import { Request, Response } from 'express';
import { Observable, of } from 'rxjs';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto, ListAllEntities, UpdateCatDto } from './dto/cat.dto';
import { AllExceptionsFilter, HttpExceptionFilter } from '../exceptionFilters';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
// @UseFilters(AllExceptionsFilter)
export class CatsController {
  // CatsService provider, that has an @Injectable decorator
  // was injected in catsController
  constructor(private catsService: CatsService) {}

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
      // UseFilters is for unhandled
    }
  }

  @Get(':id')
  findOne(@Param() params): string {
    return `This action returns a #${params.id} cat`;
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Post()
  async createBody(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Put(':id')
  update(@Param() params, @Body() updateCatDto: UpdateCatDto) {
    console.log('put');
    console.log(updateCatDto);
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
