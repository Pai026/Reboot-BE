import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultationController } from './consultation.controller';
import { ConsultationRepository } from './consultation.repository';
import { ConsultationService } from './consultation.service';
import { Consultation } from './entities/Consultation.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Consultation,ConsultationRepository]),
  ],
  controllers: [ConsultationController],
  providers: [ConsultationService]
})
export class ConsultationModule {}
