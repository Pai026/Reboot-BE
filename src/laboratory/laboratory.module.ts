import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { Laboratory } from './entity/laboratory.entity';
import { LaboratoryController } from './laboratory.controller';
import { LaboratoryRepository } from './laboratory.repository';
import { LaboratoryService } from './laboratory.service';
import * as config from 'config'
import { UserService } from 'src/user/user.service';
const jwtConfig = config.get('jwt')

@Module({
  imports: [
    TypeOrmModule.forFeature([Laboratory, LaboratoryRepository]),
    TypeOrmModule.forFeature([UserRepository]),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT || jwtConfig.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],

  controllers: [LaboratoryController],
  providers: [LaboratoryService],
  exports: [LaboratoryService],
})
export class LaboratoryModule {}
