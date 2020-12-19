import { Body, Controller, Get, Logger, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../user/strategy';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { addBedDto } from 'src/facility/dto/addBedDto.dto';
import { addSpecialisationDto } from 'src/facility/dto/addDoctorDto.dto';
import { facilityRegisterDto } from 'src/facility/dto/addFacilityDto.dto';
import { patientDetailDto } from 'src/facility/dto/addPatientDto.dto';
import { addPulseMonitorDto } from 'src/facility/dto/addPulseMonitoring';
import { LoginDto } from 'src/user/dto';
import { LaboratoryService } from './laboratory.service';

@ApiTags('Laboratory Management')
@Controller('api/v1/laboratory')
export class LaboratoryController {
    private logger = new Logger('Laboratory Controller');
    constructor(private readonly laboratoryService: LaboratoryService) {}
  
    @Get('all-laboratory')
    getAllLaboratory() {
      this.logger.verbose(`retrieving all Laboratory`);
      return this.laboratoryService.getAllFacility();
    }
  
  
    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    @Post('add-laboratory')
    addlaboratory(
      @Body() facilityregisterDto: facilityRegisterDto,
      @Req() req: any,
    ) {
      this.logger.verbose('laboratory created');
      console.log(facilityregisterDto)
      return this.laboratoryService.addLaboratory(
        facilityregisterDto,
        req.user,
      );
    }

    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    @Post('add-doctors/:laboratoryId')
    adddoctors(
      @Body() addSpecialisationdto: addSpecialisationDto,
      @Req() req: any,
       @Param('laboratoryId') _id: string)
     {
      this.logger.verbose('doctor added');
      console.log(addSpecialisationdto)
      return this.laboratoryService.adddoctor(
        addSpecialisationdto,
        req.user,
        _id
      );
    }

    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    @Post('add-patient')
    addpatient(
      @Body() patientregisterDto: patientDetailDto,
      @Req() req: any, @Param('laboratoryId') _id: string

    ) {
      this.logger.verbose('patient created');
      console.log(patientregisterDto)
      return this.laboratoryService.addpatient(
        patientregisterDto,
        req.user,_id
      );
    }

    @ApiBearerAuth()
    @UseGuards(new AuthGuard())

    @Post('add-bed/:laboratoryId')
    addbed(
      @Body() addbeddto: addBedDto,
      @Req() req: any,
       @Param('laboratoryId') _id: string)
     {
      this.logger.verbose('bed added');
      console.log(addbeddto)
      return this.laboratoryService.addbed(
        addbeddto,
        req.user,
        _id
      );
    }

    @Post('add-oximeterDetails/:patientId')
    addPulsedetails(
      @Body() addpulsemonitordto: addPulseMonitorDto,
      @Req() req: any,
       @Param('patientId') _id: string)
     {
      this.logger.verbose('details added');
      console.log(addpulsemonitordto)
      return this.laboratoryService.addOximeter(
        addpulsemonitordto,
        req.user,
        _id
      );
    }

    @Get(':laboratoryId')
    getLaboratoryById(@Req() req: any, @Param('laboratoryId') _id: string) {
      this.logger.verbose('laboratory retrieved');
      return this.laboratoryService.getFacilityById(req.user, _id);
    }

    @Get(':patientId')
    getPatientById(@Req() req: any, @Param('patientId') _id: string) {
      this.logger.verbose('patient retrieved');
      return this.laboratoryService.getPatientById(req.user, _id);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
      this.logger.verbose(`user Logged in ${loginDto.userName}`);
      return this.laboratoryService.login(loginDto);
    }
}

