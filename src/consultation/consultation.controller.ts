import { Body, Controller, Get, Logger, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/user/strategy';
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

    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    @Get('retrieveConsultationOfUser')
    getUserConsultations(
      @Req() req:any
    ){
      return this.consulationService.getUserConsultations(req.user)
    }

    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    @Get('retrieveConsultationOfUser/:id')
    getSpecificUserConsultations(
      @Param('id') _id:string
    ){
      return this.consulationService.getSpecificUserConsultations(_id)
    }


}
