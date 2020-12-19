import {
    Controller,Logger,Get,UseGuards,Req,Param,ParseIntPipe,Post,UseInterceptors,Body,UploadedFile,Delete,Patch,Query,ValidationPipe, Put,
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  import { FacilityService } from './facility.service';
  import { AuthGuard } from '../user/strategy';
import { facilityRegisterDto } from './dto/addFacilityDto.dto';
import { ObjectID } from 'typeorm';
import { patientDetailDto } from './dto/addPatientDto.dto';
import { LoginDto } from 'src/user/dto';
import { addSpecialisationDto } from './dto/addDoctorDto.dto';
import { addBedDto } from './dto/addBedDto.dto';
import { addPulseMonitorDto } from './dto/addPulseMonitoring';
  
  @ApiTags('Facility Management')
  @Controller('api/v1/facility')
  export class FacilityController {
    private logger = new Logger('Facility Controller');
    constructor(private readonly facilityService: FacilityService) {}
  
    @Get('all-facility')
    getAllFacility() {
      this.logger.verbose(`retrieving all facilities`);
      return this.facilityService.getAllFacility();
    }
  
  
    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    @Post('add-facility')
    addfacility(
      @Body() facilityregisterDto: facilityRegisterDto,
      @Req() req: any,
    ) {
      this.logger.verbose('facility created');
      console.log(facilityregisterDto)
      return this.facilityService.addfacility(
        facilityregisterDto,
        req.user,
      );
    }

    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    @Post('add-doctors/:facilityId')
    adddoctors(
      @Body() addSpecialisationdto: addSpecialisationDto,
      @Req() req: any,
       @Param('facilityId') _id: string)
     {
      this.logger.verbose('doctor added');
      console.log(addSpecialisationdto)
      return this.facilityService.adddoctor(
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
      @Req() req: any, @Param('facilityId') _id: string

    ) {
      this.logger.verbose('patient created');
      console.log(patientregisterDto)
      return this.facilityService.addpatient(
        patientregisterDto,
        req.user,_id
      );
    }

    @ApiBearerAuth()
    @UseGuards(new AuthGuard())

    @Post('add-bed/:facilityId')
    addbed(
      @Body() addbeddto: addBedDto,
      @Req() req: any,
       @Param('facilityId') _id: string)
     {
      this.logger.verbose('bed added');
      console.log(addbeddto)
      return this.facilityService.addbed(
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
      return this.facilityService.addOximeter(
        addpulsemonitordto,
        req.user,
        _id
      );
    }

    @Get(':facilityId')
    getFacilityById(@Req() req: any, @Param('facilityId') _id: string) {
      this.logger.verbose('facility retrieved');
      return this.facilityService.getFacilityById(req.user, _id);
    }

    @Get(':patientId')
    getPatientById(@Req() req: any, @Param('patientId') _id: string) {
      this.logger.verbose('patient retrieved');
      return this.facilityService.getPatientById(req.user, _id);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
      this.logger.verbose(`user Logged in ${loginDto.userName}`);
      return this.facilityService.login(loginDto);
    }
  
  
   /* @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Patch('/:id/update-Facility')
    updateRestaurant(
      @Req() req: any,
      @Param('id') id: string,
      @Body() updateFacilityDto: UpdateRestaurantDto,
    ) {
      this.logger.verbose('restaurant updated');
      return this.restaurantService.updateRestaurant(
        req.user,
        id,
        updateRestaurantDto,
      );
    }*/
  
   


  


  
  }
  
  