import { Controller, Post, Body, UseGuards, Res, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CurrentUser } from './decorators/user.decorator';
import { UserDocument } from '../user/model/user.schema';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response) {
    const user = await this.authService.signup(createUserDto, response);
    return user;
  }

  @UseGuards(LocalGuard)
  @Post('login')
  login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response) {
    this.authService.login(user, response);

    // we already that the user valid we want to add some fancy jwt only
    response.send({
      ...user,
      password: ""
    });

  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {

    response.cookie('Authentication', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0), // Set the cookie to expire immediately
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUser(@CurrentUser() user: UserDocument) {
    return user
  }

}
