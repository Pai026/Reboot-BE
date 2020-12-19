import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { addBedDto } from './addBedDto.dto';
import { addSpecialisationDto } from './addDoctorDto.dto';

export class facilityRegisterDto {
  @ApiProperty({ example: null })
  @IsString()
  facilityType: string;

  @ApiProperty({ example: null })
  @IsString()
  facilityName: string;

  @ApiProperty({ example: null })
  @IsString()
  address: string;

  @ApiProperty({ example: null })
  @IsString()
  state: string;

  @ApiProperty({ example: null })
  @IsString()
  district: string;

  @ApiProperty({ example: null })
  @IsString()
  localBody: string;

  @ApiProperty({ example: null })
  @IsString()
  ward: string;

  @ApiProperty({ example: null })
  @IsNumber()
  contact: number;

  @ApiProperty({ example: null })
  @IsNumber()
  pincode: number;

  @ApiProperty({ example: null })
  @IsOptional()
  oxygenCapacity: any;


  @ApiProperty({ example: null })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: null })
  @IsNumber()
  longitude: number;

  
}
