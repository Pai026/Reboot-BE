import { Body, Controller, Get, Logger, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConsultationService } from './consultation.service';
import { AddConsultationDto } from './dto';

@ApiTags('Consultation Controller')
@Controller('api/v1/consultation')
export class ConsultationController {
    constructor(private readonly consulationService:ConsultationService){}
    private logger = new Logger()

    @Post('createConsultation')
    createConsultation(@Body() createConsultation: AddConsultationDto) {
      return this.consulationService.createConsultation(createConsultation);
    }

    @Patch('updateConsultation/:id')
    updateConsultation(@Param('id') id:string,@Body() createConsultation: AddConsultationDto) {
      return this.consulationService.createConsultation(createConsultation);
    }

    @Get('retrieveConsultations')
    getConsultations(){
        return this.consulationService.retrieveConsultation()
    }


}
