import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { FacilityRepository } from './facility.repository';
import { Facility } from './entity/facility.entity';
import { FacilityService } from './facility.service';
import { FacilityController } from './facility.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config'
import { UserService } from 'src/user/user.service';
const jwtConfig = config.get('jwt')
@Module({
  imports: [
    TypeOrmModule.forFeature([Facility, FacilityRepository]),
    TypeOrmModule.forFeature([UserRepository]),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT || jwtConfig.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],

  controllers: [FacilityController],
  providers: [FacilityService],
  exports: [FacilityService],
})
export class FacilityModule {}
