import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { addBedDto } from './addBedDto.dto';
import { addSpecialisationDto } from './addDoctorDto.dto';

export class patientDetailDto {
  @ApiProperty({ example: null })
  @IsString()
  userName: string;

  @ApiProperty({ example: null })
  @IsString()
  address: string;

  @ApiProperty({ example: null })
  @IsString()
  diseaseStatus: string;

  @ApiProperty({ example: null })
  @IsString()
  testType: string;

  @ApiProperty({ example: null })
  @IsString()
  state: string;

  @ApiProperty({ example: null })
  dateofSample: any;

  @ApiProperty({ example: null })
  dateOfResult: any;

  @ApiProperty({ example: null })
  dob: any;

  @ApiProperty({ example: null })
  @IsString()
  gender: string;

  @ApiProperty({ example: null })
  @IsString()
  district: string;

  @ApiProperty({ example: null })
  @IsString()
  nationality: string;

  @ApiProperty({ example: null })
  @IsString()
  localBody: string;

  @ApiProperty({ example: null })
  @IsString()
  ward: string;

  @ApiProperty({ example: null })
  @IsString()
  bloodGroup: string;

  @ApiProperty({ example: null })
  @IsNumber()
  contact: number;

  @ApiProperty({ example: null })
  @IsNumber()
  pincode: number;

  @ApiProperty({ example: null })
  @IsString()
  medicalHistory: string;

  @ApiProperty({ example: null })
  @IsOptional()
  ongingMedication: any;

  @ApiProperty({ example: null })
  @IsOptional()
  NoOfAgedDependants: any;

  @ApiProperty({ example: null })
  @IsString()
  allergies: string;

  @ApiProperty({ example: null })
  @IsString()
  travelHistory: string;

 
  
}
