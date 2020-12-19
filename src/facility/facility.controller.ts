import {
    Controller,Logger,Get,UseGuards,Req,Param,ParseIntPipe,Post,UseInterceptors,Body,UploadedFile,Delete,Patch,Query,ValidationPipe, Put,
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  import { FacilityService } from './facility.service';
  import { AuthGuard } from '../user/strategy';
import { facilityRegisterDto } from './dto/addFacilityDto.dto';
import { ObjectID } from 'typeorm';
  
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

   

    @Get(':facilityId')
    getRestaurantById(@Req() req: any, @Param('facilityId') _id: string) {
      this.logger.verbose('facility retrieved');
      return this.facilityService.getFacilityById(req.user, _id);
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
  
  