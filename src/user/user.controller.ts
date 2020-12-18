import { Body, Controller, Get, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto';
import { UserService } from './user.service';
import {AuthGuard} from './strategy';

@ApiTags('User Controller')
@Controller('api/v1/user')
export class UserController {
    private logger = new Logger('User Controller');
    constructor(private readonly userService:UserService){}

    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    @Get('getUser')
    getUser(@Req() req: any) {
    this.logger.verbose(`User Retrieved `);
    return this.userService.getUser(req);
  }
  
    @Post('login')
    login(@Body() loginDto: LoginDto) {
      this.logger.verbose(`user Logged in ${loginDto.userName}`);
      return this.userService.login(loginDto);
    }

}
