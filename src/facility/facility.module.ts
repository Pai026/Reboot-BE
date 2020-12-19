import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { FacilityRepository } from './facility.repository';
import { Facility } from './entity/facility.entity';
import { FacilityService } from './facility.service';
import { FacilityController } from './facility.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Facility, FacilityRepository]),
    TypeOrmModule.forFeature([UserRepository]),

  ],

  controllers: [FacilityController],
  providers: [FacilityService],
  exports: [FacilityService],
})
export class FacilityModule {}
