import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
// import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { CatsService } from './cats/cats.service';
import { User } from './users/schema/user.schema';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  // notice that if app.module does not import CatsService provider from CatsModule
  // this provider won't be available in AppModule context to use this provider in its controller
  // to solve, just import CatsModule (that has CatsService provider in its context) to AppModule
  // also be able to has this provider in its context to use in its controller, so Nest will be
  // able to resolve dependency tree of modules

  //   Angular providers are registered in the global scope
  //   Nest, actually, encapsules its providers in its module, *make available elsewhere with @Global,
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    // value returned by "validate()" in our local strategy, we get here after 'valite' returns a valid user
    // we reach the handler if guard was successful
    return this.authService.login(req.user);
  }

  @Post('auth/signup')
  async signup(@Body() body) {
    try {
      const user = await this.authService.signup(body);
      return user;
    } catch (err) {
      throw new HttpException(err.message, 403);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
