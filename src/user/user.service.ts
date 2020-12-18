import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    private logger = new Logger('User Service');

    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository:UserRepository,
        private readonly jwtService: JwtService,
        ){}

    async getUser(req:any): Promise<any>{
        const { userName } = req.user
        const user = await this.userRepository.findOne({userName});
        if(user){
            const{...result} = user;
            delete result.password;
      delete result.id;
      return {
        success: true,
        message: 'Success',
        data: result,
      };
    }
    throw new UnauthorizedException();
  }
  async getAllUsers(): Promise<any>{
    const users=await this.userRepository.find()
    console.log(users)
  }
  async validateUser(userName: string, password: string): Promise<any> {
    try {
      console.log(userName)
      const user = await this.userRepository.findOne({
        userName
      });
      console.log(user);
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          return user;
        } else {
          return null;
        }
      }
    } catch (e) {
      console.log(e);
      return {
        success: false,
        message: 'Something went wrong..! Login failed.',
      };
    }
  }

  async login(data: any) {
    const user = await this.validateUser(data.userName, data.password);
    console.log(user)
    if (user) {
      const { userName, id, type } = user;
      const payload = { userName, id, type  };
      return {
        success: true,
        // eslint-disable-next-line @typescript-eslint/camelcase
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException({
        detail: 'invalid username or password',
      });
    }
  }

}
