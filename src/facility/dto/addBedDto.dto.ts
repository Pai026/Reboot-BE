import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ObjectID } from 'mongodb';

export class addBedDto {
  
  @ApiProperty({ example: null })
  @IsString()
  bedType: string;

  @ApiProperty({ example: null })
  totalCapacity: any;

  @ApiProperty({ example: null })
  currentlyOccupied: any;

}
