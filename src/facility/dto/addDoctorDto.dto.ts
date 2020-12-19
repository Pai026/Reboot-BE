import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ObjectID } from 'mongodb';

export class addSpecialisationDto {
  
  @ApiProperty({ example: null })
  @IsString()
  specialisation: string;

  @ApiProperty({ example: null })
  @IsNumber()
  count: any;


}
