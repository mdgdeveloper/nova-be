import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

export type AuthBody = {
  pin: number;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get()
  findAll() {
    console.log('Auth!');
  }

  @Post()
  findOne(@Body() body: AuthBody) {
    return this.authService.findOne(body);
  }
}
