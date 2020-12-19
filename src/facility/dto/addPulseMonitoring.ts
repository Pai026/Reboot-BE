import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ObjectID } from 'mongodb';

export class addPulseMonitorDto {
  
  @ApiProperty({ example: null })
  @IsString()
  spo2: string;

  @ApiProperty({ example: null })
  @IsNumber()
  pulseRate: any;


}
