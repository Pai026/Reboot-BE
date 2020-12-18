import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import * as config from 'config'
import { JwtStrategy, LocalStrategy } from './strategy';
const jwtConfig = config.get('jwt')
@Module({
  imports:[

    TypeOrmModule.forFeature([User,UserRepository]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT || jwtConfig.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
