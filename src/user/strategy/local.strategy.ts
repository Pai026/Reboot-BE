import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: UserService) {
    super({
      usernameField: 'userName',
    });
  }

  async validate(userName: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(userName, password);
    if (!user) {
      throw new UnauthorizedException({
        detail: 'No active account found with the given credentials',
        code: 'no_active_account',
      });
    }
    return user;
  }
}
